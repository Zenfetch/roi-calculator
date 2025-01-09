"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
// import { PDFDownloadButton } from './components/pdf-download-button';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
) as any;

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FAFCFE',
    color: '#051E2D',
  },
  title: {
    fontSize: 42,
    marginBottom: 12,
    color: '#051E2D',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#6E6C6A',
    textAlign: 'center',
    marginBottom: 40,
  },
  section: {
    marginBottom: 20,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    border: '1 solid #EAEAEA',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#359FA6',
    marginBottom: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionNumber: {
    backgroundColor: '#359FA6',
    color: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: 'center',
    marginRight: 12,
    fontSize: 18,
    padding: 7,
    fontFamily: 'Helvetica-Bold',
    boxShadow: '0 2px 4px rgba(53,159,166,0.2)',
  },
  taskGroup: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: '#FAFCFE',
    borderRadius: 12,
    border: '1 solid #EAEAEA',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 10,
    borderBottom: '1 solid #EAEAEA',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#6E6C6A',
    fontFamily: 'Helvetica',
  },
  value: {
    fontSize: 16,
    color: '#051E2D',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  highlight: {
    fontSize: 16,
    color: '#359FA6',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  summaryBox: {
    backgroundColor: '#F7FAFB',
    padding: 24,
    borderRadius: 8,
    border: '1 solid #E5EEF0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gradientBox: {
    marginTop: 32,
    padding: 40,
    backgroundColor: '#359FA6',
    borderRadius: 16,
    boxShadow: '0 4px 6px rgba(53,159,166,0.2)',
  },
  gradientTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold',
  },
  gradientValue: {
    color: 'white',
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Helvetica-Bold',
  },
  gradientSubtext: {
    color: 'white',
    opacity: 0.9,
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    color: '#6E6C6A',
    fontSize: 12,
    borderTop: '1 solid #EAEAEA',
    paddingTop: 20,
    fontFamily: 'Helvetica',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  divider: {
    borderBottom: '2 solid #EAEAEA',
    marginVertical: 24,
  },
  statBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
});

interface ROIResults {
  totalInvestment: number;
  expectedReturn: number;
  roiPercentage: number;
}

const ROIDocument = ({ results, totals, growthPotential, inputs, tasks }: { 
  results: ROIResults;
  totals: any;
  growthPotential: any;
  inputs: any;
  tasks: any;
}) => (
  <Document>
    {/* First Page */}
    <Page size="A4" style={pdfStyles.page}>
      {/* Cover Page with Gradient Background */}
      <View style={[pdfStyles.section, { marginBottom: 0, backgroundColor: '#359FA6', padding: 40 }]}>
        <View style={{ borderBottom: '2 solid rgba(255,255,255,0.1)', marginBottom: 20 }} />
        
        <Text style={[pdfStyles.title, { color: 'white' }]}>ROI Calculator</Text>
        <Text style={[pdfStyles.subtitle, { color: 'white', opacity: 0.9 }]}>
          Discover Your Potential Savings with GovEagle
        </Text>
        
        {/* Summary Box */}
        <View style={[pdfStyles.summaryBox, { backgroundColor: 'white', marginTop: 40 }]}>
          <Text style={[pdfStyles.sectionTitle, { marginBottom: 12 }]}>Annual Impact Summary</Text>
          <View style={pdfStyles.summaryRow}>
            <Text style={pdfStyles.label}>Cost Savings:</Text>
            <Text style={pdfStyles.highlight}>${totals.annualSavings.toLocaleString()}</Text>
          </View>
          <View style={pdfStyles.summaryRow}>
            <Text style={pdfStyles.label}>Potential New Revenue:</Text>
            <Text style={pdfStyles.highlight}>${growthPotential.potentialNewRevenue.toLocaleString()}</Text>
          </View>
          <View style={[pdfStyles.summaryRow, { marginTop: 20, borderTop: '1 solid #EAEAEA', paddingTop: 20 }]}>
            <Text style={[pdfStyles.label, { fontSize: 18 }]}>Total Annual Impact:</Text>
            <Text style={[pdfStyles.highlight, { fontSize: 24, color: '#359FA6' }]}>
              ${(totals.annualSavings + growthPotential.potentialNewRevenue).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </Page>

    {/* Second Page */}
    <Page size="A4" style={pdfStyles.page}>
      {/* Company Data Section */}
      <View style={pdfStyles.section}>
        <View style={pdfStyles.sectionTitle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={pdfStyles.sectionNumber}>1</Text>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#359FA6' }}>Company Data</Text>
              <Text style={{ fontSize: 14, color: '#6E6C6A', marginTop: 4 }}>Basic information about your organization</Text>
            </View>
          </View>
        </View>
        <View style={[pdfStyles.taskGroup, { marginBottom: 0 }]}>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Annual RFPs:</Text>
            <Text style={pdfStyles.value}>{inputs.rfpsPerYear}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Hourly Rate:</Text>
            <Text style={pdfStyles.value}>${inputs.hourlyRate}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Efficiency Gain:</Text>
            <Text style={pdfStyles.value}>{inputs.efficiencyGain}%</Text>
          </View>
          <View style={[pdfStyles.row, { borderBottom: 'none' }]}>
            <Text style={pdfStyles.label}>Average Contract Size:</Text>
            <Text style={pdfStyles.value}>${parseInt(inputs.averageAwardSize).toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Task Breakdown Section */}
      <View style={[pdfStyles.section, { marginTop: 20 }]}>
        <View style={pdfStyles.sectionTitle}>
          <Text style={pdfStyles.sectionNumber}>2</Text>
          <Text>Task Breakdown</Text>
        </View>
        {tasks.map((task: any, index: any) => {
          const { hoursUsing, hoursSaved, costSavings } = {
            hoursUsing: parseFloat(task.hours) * (1 - parseFloat(inputs.efficiencyGain) / 100),
            hoursSaved: parseFloat(task.hours) * (parseFloat(inputs.efficiencyGain) / 100),
            costSavings: parseFloat(task.hours) * (parseFloat(inputs.efficiencyGain) / 100) * parseFloat(inputs.hourlyRate)
          };
          
          return (
            <View key={index} style={[pdfStyles.taskGroup, { marginBottom: 12 }]}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#051E2D' }}>
                {task.name}
              </Text>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Hours Manually:</Text>
                <Text style={pdfStyles.value}>{task.hours}</Text>
              </View>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Hours with GovEagle:</Text>
                <Text style={pdfStyles.value}>{hoursUsing.toFixed(1)}</Text>
              </View>
              <View style={[pdfStyles.row, { borderBottom: 'none' }]}>
                <Text style={pdfStyles.label}>Hours Saved:</Text>
                <Text style={pdfStyles.highlight}>{hoursSaved.toFixed(1)}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Page>

    {/* Third Page */}
    <Page size="A4" style={pdfStyles.page}>
      {/* Growth Potential Section */}
      <View style={pdfStyles.section}>
        <View style={pdfStyles.sectionTitle}>
          <Text style={pdfStyles.sectionNumber}>3</Text>
          <Text>Growth Potential</Text>
        </View>
        <View style={pdfStyles.taskGroup}>
          <View style={pdfStyles.summaryRow}>
            <Text style={pdfStyles.label}>Additional RFPs Pursued:</Text>
            <Text style={pdfStyles.highlight}>{inputs.additionalRfps}</Text>
          </View>
          <View style={pdfStyles.summaryRow}>
            <Text style={pdfStyles.label}>Conversion Rate:</Text>
            <Text style={pdfStyles.highlight}>{inputs.conversionRate}%</Text>
          </View>
          <View style={pdfStyles.summaryRow}>
            <Text style={pdfStyles.label}>Additional Contract Wins:</Text>
            <Text style={pdfStyles.highlight}>
              {Math.round(growthPotential.potentialNewWins)}
            </Text>
          </View>
          <View style={[pdfStyles.summaryRow, { borderBottom: 'none' }]}>
            <Text style={pdfStyles.label}>Potential New Revenue:</Text>
            <Text style={pdfStyles.highlight}>
              ${growthPotential.potentialNewRevenue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Final Impact Box */}
      <View style={pdfStyles.gradientBox}>
        <View style={{ borderTop: '2 solid rgba(255,255,255,0.1)', marginBottom: 20 }} />
        
        <Text style={pdfStyles.gradientTitle}>Your Annual ROI</Text>
        <Text style={pdfStyles.gradientValue}>
          ${(totals.annualSavings + growthPotential.potentialNewRevenue).toLocaleString()}
        </Text>
        <Text style={pdfStyles.gradientSubtext}>Projected Annual Impact</Text>
        
        <View style={{ borderBottom: '2 solid rgba(255,255,255,0.1)', marginTop: 20 }} />
      </View>

      <Text style={pdfStyles.footer}>Generated by GovEagle ROI Calculator • www.goveagle.com</Text>
    </Page>
  </Document>
);

// Add interface for render prop parameters
interface PDFRenderProps {
  blob: Blob | null;
  url: string | null;
  loading: boolean;
  error: Error | null;
}

const RoiCalculator = () => {
  const [rfpsPerYear, setRfpsPerYear] = useState("24");
  const [hourlyRate, setHourlyRate] = useState("75");
  const [efficiencyGain, setEfficiencyGain] = useState("85");

  const [tasks, setTasks] = useState([
    {
      name: "Requirements Compliance Matrix (e.g. Shredding a doc to Excel)",
      hours: "12",
    },
    { name: "Discovery (e.g. Gap analysis across docs)", hours: "5" },
    {
      name: "Past Performance and Existing Content Search",
      hours: "3",
    },
    {
      name: "Compliant Outline (e.g. Marrying sections L & M, mapping PWS requirements, etc.)",
      hours: "5",
    },
    { name: "Content Drafting (e.g. Pink/Red team)", hours: "30" },
    {
      name: "Color Team Reviews (e.g. Editing and reviewing a draft)",
      hours: "10",
    },
    { name: "Acronym Checking", hours: "3" },
  ]);

  const [additionalRfps, setAdditionalRfps] = useState(
    Math.round(24 * 0.2).toString()
  );
  const [averageAwardSize, setAverageAwardSize] = useState("1000000");
  const [conversionRate, setConversionRate] = useState("25");

  const [results, setResults] = useState<ROIResults | null>(null);

  const calculateSavings = (hours: string) => {
    const hoursNum = parseFloat(hours) || 0;
    const efficiencyGainNum = parseFloat(efficiencyGain) || 0;
    const hourlyRateNum = parseFloat(hourlyRate) || 0;
    const hoursUsing = hoursNum * (1 - efficiencyGainNum / 100);
    const hoursSaved = hoursNum - hoursUsing;
    const costSavings = hoursSaved * hourlyRateNum;
    return { hoursUsing, hoursSaved, costSavings };
  };

  const calculateTotals = () => {
    let totalHoursManually = 0;
    let totalHoursUsing = 0;
    let totalHoursSaved = 0;
    let totalCostSavings = 0;

    tasks.forEach((task) => {
      const { hoursUsing, hoursSaved, costSavings } = calculateSavings(
        task.hours
      );
      totalHoursManually += parseFloat(task.hours) || 0;
      totalHoursUsing += hoursUsing;
      totalHoursSaved += hoursSaved;
      totalCostSavings += costSavings;
    });

    const annualSavings = totalCostSavings * (parseFloat(rfpsPerYear) || 0);

    return {
      totalHoursManually,
      totalHoursUsing,
      totalHoursSaved,
      totalCostSavings,
      annualSavings,
    };
  };

  const calculateGrowthPotential = () => {
    const additionalRfpsNum = parseFloat(additionalRfps) || 0;
    const averageAwardSizeNum = parseFloat(averageAwardSize) || 0;
    const conversionRateNum = parseFloat(conversionRate) || 0;

    const potentialNewWins = Math.round(
      additionalRfpsNum * (conversionRateNum / 100)
    );
    const potentialNewRevenue = potentialNewWins * averageAwardSizeNum;

    return {
      potentialNewWins,
      potentialNewRevenue,
    };
  };

  const totals = calculateTotals();
  const growthPotential = calculateGrowthPotential();

  useEffect(() => {
    setResults({
      totalInvestment: totals.annualSavings,
      expectedReturn: growthPotential.potentialNewRevenue,
      roiPercentage: ((totals.annualSavings + growthPotential.potentialNewRevenue) / 50000) * 100
    });
  }, [totals, growthPotential]);

  const handleRfpsPerYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRfpsPerYear = e.target.value;
    setRfpsPerYear(newRfpsPerYear);
    const calculatedAdditional = Math.round(
      parseFloat(newRfpsPerYear || "0") * 0.2
    );
    setAdditionalRfps(calculatedAdditional.toString());
  };

  return (
    <div className="p-8 bg-gradient-to-br from-ge-lighterGrey/50 to-ge-lighterGrey shadow-xl rounded-xl max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-ge-darkBlue flex flex-col items-center justify-center gap-2">
          ROI Calculator
        </h1>
        <p className="text-ge-grey text-lg font-medium">
          Discover Your Potential Savings with GovEagle
        </p>
      </div>

      <div className="mb-12 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-ge-teal flex items-center">
          <span className="bg-ge-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
            1
          </span>
          Company Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="rfpsPerYear" className="h-12 block">
              How many RFPs / Proposals does your company respond to each year?
            </Label>
            <Input
              id="rfpsPerYear"
              type="number"
              value={rfpsPerYear}
              onChange={handleRfpsPerYearChange}
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <Label htmlFor="hourlyRate" className="h-12 block">
              Fully Burdened Average Hourly Rate* ($)
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="e.g., 75"
            />
          </div>
          <div>
            <Label htmlFor="efficiencyGain" className="h-12 block">
              Average efficiency gain per task** (%)
            </Label>
            <Input
              id="efficiencyGain"
              type="number"
              value={efficiencyGain}
              onChange={(e) => setEfficiencyGain(e.target.value)}
              placeholder="e.g., 85"
            />
          </div>
        </div>
        <p className="text-sm text-ge-grey mt-4 p-4 bg-ge-lighterGrey rounded-lg">
          * Fully burdened includes employer costs like social security etc.
          <br />
          ** Default of 85%, based on survey of 15+ GovEagle customers
        </p>
      </div>

      <div className="mb-12 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-ge-teal flex items-center">
          <span className="bg-ge-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
            2
          </span>
          Efficiency Increase Per Cycle
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ge-teal text-white">
                <th className="py-3 px-4 text-left rounded-tl-lg">Task</th>
                <th className="py-3 px-4 text-right">Avg. Hours Manually</th>
                <th className="py-3 px-4 text-right">Hours using GovEagle</th>
                <th className="py-3 px-4 text-right">Hours Saved per Cycle</th>
                <th className="py-3 px-4 text-right rounded-tr-lg">
                  Cost Savings ($)
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                const { hoursUsing, hoursSaved, costSavings } =
                  calculateSavings(task.hours);
                return (
                  <tr
                    key={index}
                    className="border-b border-ge-lightGrey hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-4">{task.name}</td>
                    <td className="py-2 px-4 text-right">
                      <Input
                        type="number"
                        value={task.hours}
                        onChange={(e) => {
                          const newTasks = [...tasks];
                          newTasks[index].hours = e.target.value;
                          setTasks(newTasks);
                        }}
                        className="w-20 ml-auto"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-2 px-4 text-right">
                      {hoursUsing.toFixed(1)}
                    </td>
                    <td className="py-2 px-4 text-right">
                      {hoursSaved.toFixed(1)}
                    </td>
                    <td className="py-2 px-4 text-right">
                      ${costSavings.toFixed(0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-ge-lightTeal font-semibold">
                <td className="py-2 px-4">Totals</td>
                <td className="py-2 px-4 text-right">
                  {totals.totalHoursManually.toFixed(1)}
                </td>
                <td className="py-2 px-4 text-right">
                  {totals.totalHoursUsing.toFixed(1)}
                </td>
                <td className="py-2 px-4 text-right">
                  {totals.totalHoursSaved.toFixed(1)}
                </td>
                <td className="py-2 px-4 text-right">
                  ${totals.totalCostSavings.toFixed(0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-12 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-ge-teal flex items-center">
          <span className="bg-ge-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
            3
          </span>
          Growth Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="additionalRfps" className="h-12 block">
              How many more RFPs would you pursue with saved time?*
            </Label>
            <Input
              id="additionalRfps"
              type="number"
              value={additionalRfps}
              onChange={(e) => setAdditionalRfps(e.target.value)}
              placeholder="e.g., 12"
            />
          </div>
          <div>
            <Label htmlFor="averageAwardSize" className="h-12 block">
              What is your average contract award size? ($)
            </Label>
            <Input
              id="averageAwardSize"
              type="number"
              value={averageAwardSize}
              onChange={(e) => setAverageAwardSize(e.target.value)}
              placeholder="e.g., 1000000"
            />
          </div>
          <div>
            <Label htmlFor="conversionRate" className="h-12 block">
              What is your conversion rate? (%)
            </Label>
            <Input
              id="conversionRate"
              type="number"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value)}
              placeholder="e.g., 25"
            />
          </div>
        </div>
        <p className="text-sm text-ge-grey mt-4 p-4 bg-ge-lighterGrey rounded-lg">
          * Most GovEagle customers are able to go after 20% more RFPs
        </p>
      </div>

      <div className="mb-12 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-ge-teal flex items-center">
          <span className="bg-ge-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
            4
          </span>
          Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Efficiency Savings Card */}
          <div className="bg-ge-lightTeal/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-ge-teal mb-4">
              Annual Efficiency Savings
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-ge-grey">Hours Manually:</span>
                <span className="font-semibold">
                  {(
                    totals.totalHoursManually * parseFloat(rfpsPerYear)
                  ).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ge-grey">Hours using GovEagle:</span>
                <span className="font-semibold">
                  {(totals.totalHoursUsing * parseFloat(rfpsPerYear)).toFixed(
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ge-grey">Total Hours Saved:</span>
                <span className="font-semibold text-ge-teal">
                  {(totals.totalHoursSaved * parseFloat(rfpsPerYear)).toFixed(
                    0
                  )}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-ge-grey">Cost Savings:</span>
                  <span className="font-semibold text-ge-teal text-lg">
                    $
                    {totals.annualSavings.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Potential Card */}
          <div className="bg-ge-darkBlue/5 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-ge-darkBlue mb-4">
              Growth Potential
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-ge-grey">Additional RFPs:</span>
                <span className="font-semibold">{additionalRfps}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ge-grey">Win Rate:</span>
                <span className="font-semibold">{conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ge-grey">Potential New Wins:</span>
                <span className="font-semibold text-ge-darkBlue">
                  {Math.round(growthPotential.potentialNewWins)}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-ge-grey">Potential New Revenue:</span>
                  <span className="font-semibold text-ge-darkBlue text-lg">
                    $
                    {growthPotential.potentialNewRevenue.toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Impact Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-ge-teal/10 to-ge-darkBlue/10 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Annual Impact:</span>
            <span className="text-2xl font-bold text-ge-darkBlue">
              $
              {(
                totals.annualSavings + growthPotential.potentialNewRevenue
              ).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-ge-teal to-ge-darkBlue text-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Annual ROI</h2>
          <p className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
            $
            {(
              totals.annualSavings + growthPotential.potentialNewRevenue
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-white/80">Projected Annual Impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Cost Savings Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              Efficiency Metrics
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    $
                    {totals.annualSavings.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-sm text-white/70">Annual Cost Savings</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{efficiencyGain}%</p>
                  <p className="text-sm text-white/70">
                    Efficiency Improvement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Growth Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              Growth Potential
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    $
                    {growthPotential.potentialNewRevenue.toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </p>
                  <p className="text-sm text-white/70">Potential New Revenue</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(growthPotential.potentialNewWins)}
                  </p>
                  <p className="text-sm text-white/70">
                    Projected New Contract Wins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      {results && (
        <div className="mt-8 text-center">
          <PDFDownloadLink
            document={
              <ROIDocument 
                results={results}
                totals={totals}
                growthPotential={growthPotential}
                inputs={{
                  rfpsPerYear,
                  efficiencyGain,
                  additionalRfps,
                  conversionRate,
                  hourlyRate,
                  averageAwardSize
                }}
                tasks={tasks}
              />
            }
            fileName="roi-calculator-results.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ge-teal text-white rounded-lg hover:bg-ge-teal/90 transition-colors shadow-lg font-medium"
          >
            {({ loading }: PDFRenderProps) => (
              <>
                {loading ? (
                  'Generating PDF...'
                ) : (
                  <div className="flex flex-row items-center gap-1.5">
                    <p>Download PDF Report</p>
                  </div>
                )}
              </>
            )}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoiCalculator;
