"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const totals = calculateTotals();

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
              How many RFPs / Proposals does your company review each year?
            </Label>
            <Input
              id="rfpsPerYear"
              type="number"
              value={rfpsPerYear}
              onChange={(e) => setRfpsPerYear(e.target.value)}
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
          Results
        </h2>
        <table className="w-full">
          <thead>
            <tr className="bg-ge-teal text-white">
              <th className="py-3 px-4 text-left rounded-tl-lg"></th>
              <th className="py-3 px-4 text-center">Hours Manually</th>
              <th className="py-3 px-4 text-center">Hours using GovEagle</th>
              <th className="py-3 px-4 text-center">Hours Saved</th>
              <th className="py-3 px-4 text-center rounded-tr-lg">
                Cost Savings ($)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ge-lightGrey font-semibold">
              <td className="py-2 px-4 text-left">Annual Totals</td>
              <td className="py-2 px-4 text-center">
                {(totals.totalHoursManually * parseFloat(rfpsPerYear)).toFixed(
                  0
                )}
              </td>
              <td className="py-2 px-4 text-center">
                {(totals.totalHoursUsing * parseFloat(rfpsPerYear)).toFixed(0)}
              </td>
              <td className="py-2 px-4 text-center">
                {(totals.totalHoursSaved * parseFloat(rfpsPerYear)).toFixed(0)}
              </td>
              <td className="py-2 px-4 text-center">
                ${totals.annualSavings.toFixed(0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-gradient-to-r from-ge-teal to-ge-darkBlue text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Annual ROI</h2>
        <p className="text-4xl font-bold mb-4">
          $
          {totals.annualSavings.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>
        <div className="flex flex-col md:flex-row gap-4 text-sm opacity-90">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
            </svg>
            {rfpsPerYear} RFPs/Contracts per year
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            {efficiencyGain}% efficiency gain
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
