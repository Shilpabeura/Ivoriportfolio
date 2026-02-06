import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Info, TrendingUp, Calculator } from "lucide-react";

type PaymentPlan = "60/40" | "70/30" | "100";

const ASSUMPTIONS = {
  appreciationAtHandover: 0.5, // 50% based on last 5 year trend
  postHandoverAppreciation: 0.05, // 5% PA
  rentalYield: 0.07, // 7%
  dldFee: 0.04, // 4% DLD for all properties
  brokerageReady: 0.02, // 2% brokerage for ready property
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const ROICalculator = () => {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>("60/40");

  const paymentPlans: { plan: PaymentPlan; label: string; pct: number }[] = [
    { plan: "60/40", label: "Off-Plan 60/40", pct: 0.6 },
    { plan: "70/30", label: "Off-Plan 70/30", pct: 0.7 },
    { plan: "100", label: "Ready Property", pct: 1.0 },
  ];

  const calculations = useMemo(() => {
    const plans = paymentPlans.map(({ plan, pct }) => {
      const isReady = plan === "100";
      const totalPaymentPct = pct + ASSUMPTIONS.dldFee + (isReady ? ASSUMPTIONS.brokerageReady : 0);
      const totalPayment = propertyValue * totalPaymentPct;

      // Year-by-year property values
      const years = [];
      for (let y = 0; y <= 3; y++) {
        let propValue: number;
        let rentalIncome: number;

        if (y === 0) {
          propValue = propertyValue;
          rentalIncome = isReady ? propertyValue * ASSUMPTIONS.rentalYield : 0;
        } else if (y <= 3 && !isReady) {
          // Off-plan: appreciation at handover spread over 3 years + post-handover
          const handoverAppPerYear = ASSUMPTIONS.appreciationAtHandover / 3;
          propValue = propertyValue * Math.pow(1 + handoverAppPerYear, y);
          rentalIncome = 0; // No rental during construction
        } else {
          // Ready property: post-handover appreciation
          propValue = propertyValue * Math.pow(1 + ASSUMPTIONS.postHandoverAppreciation, y);
          rentalIncome = propValue * ASSUMPTIONS.rentalYield;
        }

        years.push({
          year: y,
          propertyValue: propValue,
          rentalIncome,
        });
      }

      const finalValue = years[3].propertyValue;
      const totalRental = years.reduce((sum, y) => sum + y.rentalIncome, 0);
      const capitalAppreciation = finalValue - propertyValue;
      const netProfit = capitalAppreciation + totalRental;
      const roi = (netProfit / totalPayment) * 100;

      return {
        plan,
        totalPayment,
        capitalAppreciation,
        rentalIncome: totalRental,
        netProfit,
        roi,
        years,
      };
    });

    return plans;
  }, [propertyValue]);

  const selectedCalc = calculations.find((c) => c.plan === selectedPlan)!;

  return (
    <section id="roi" className="py-24 md:py-32 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-gold" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Interactive Analysis
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            ROI Comparison — <span className="text-gradient-gold">3 Years Period</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scenario: Exit during handover · Adjust property value to see your potential returns
          </p>
        </motion.div>

        {/* Property Value Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gradient-card rounded-xl p-8 border border-border shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Property Value
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">AED</span>
                <span className="font-display text-4xl font-bold text-gradient-gold">
                  {formatCurrency(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={10000000}
                step={100000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-gold [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>AED 500K</span>
                <span>AED 10M</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Plan Tabs */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {paymentPlans.map(({ plan, label }) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedPlan === plan
                    ? "bg-gradient-gold text-primary-foreground shadow-gold"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ROI Summary Cards */}
        <motion.div
          key={selectedPlan + propertyValue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Payment", value: `AED ${formatCurrency(selectedCalc.totalPayment)}`, highlight: false },
              { label: "Capital Appreciation", value: `AED ${formatCurrency(selectedCalc.capitalAppreciation)}`, highlight: false },
              { label: "Rental Income", value: `AED ${formatCurrency(selectedCalc.rentalIncome)}`, highlight: false },
              { label: "ROI", value: `${selectedCalc.roi.toFixed(0)}%`, highlight: true },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-6 text-center border shadow-card ${
                  item.highlight
                    ? "bg-primary/10 border-primary/30"
                    : "bg-gradient-card border-border"
                }`}
              >
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  {item.label}
                </p>
                <p
                  className={`font-display text-xl md:text-2xl font-bold ${
                    item.highlight ? "text-gradient-gold" : "text-foreground"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="bg-gradient-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Metric
                    </th>
                    {paymentPlans.map(({ plan, label }) => (
                      <th
                        key={plan}
                        className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${
                          selectedPlan === plan ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Total Payment",
                      values: calculations.map((c) => `AED ${formatCurrency(c.totalPayment)}`),
                    },
                    {
                      label: "Capital Appreciation",
                      values: calculations.map((c) => `AED ${formatCurrency(c.capitalAppreciation)}`),
                    },
                    {
                      label: "Rental Income",
                      values: calculations.map((c) => `AED ${formatCurrency(c.rentalIncome)}`),
                    },
                    {
                      label: "Net Profit",
                      values: calculations.map((c) => `AED ${formatCurrency(c.netProfit)}`),
                    },
                    {
                      label: "ROI",
                      values: calculations.map((c) => `${c.roi.toFixed(0)}%`),
                      isBold: true,
                    },
                  ].map((row, rowIdx) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border/50 ${
                        row.isBold ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {row.label}
                      </td>
                      {row.values.map((val, i) => (
                        <td
                          key={i}
                          className={`px-6 py-4 text-sm text-right ${
                            row.isBold
                              ? "font-bold text-primary text-lg"
                              : selectedPlan === paymentPlans[i].plan
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Year-by-Year Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Year-by-Year Breakdown ({paymentPlans.find((p) => p.plan === selectedPlan)?.label})
          </h3>
          <div className="bg-gradient-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Property Value (AED)
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Rental Income (AED)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCalc.years.map((yearData) => (
                    <tr key={yearData.year} className="border-b border-border/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        Year {yearData.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-foreground">
                        {formatCurrency(yearData.propertyValue)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-muted-foreground">
                        {yearData.rentalIncome > 0
                          ? formatCurrency(yearData.rentalIncome)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Assumptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-secondary/50 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-primary" />
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                Assumptions
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Appreciation at Handover — 50% (based on last 5 year trend)",
                "Post-Handover Appreciation — 5% PA",
                "Rental Yield — 7%",
                "Total Payment includes 4% DLD for all properties & 2% brokerage charge for ready property",
              ].map((assumption) => (
                <div key={assumption} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {assumption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
