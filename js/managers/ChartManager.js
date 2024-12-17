import { Utils } from "../utils/Utils.js";
import { ProfileManager } from "./ProfileManager.js";
import { compoundData } from "../data/compoundData.js";

/**
 * Manages the chart visualization of compound levels over time
 */
class ChartManagerClass {
	constructor() {
		/** @type {Chart|null} */
		this.chart = null;
	}

	/**
	 * Updates the chart with current compound administration data
	 */
	updateChart() {
		const timePoints = Utils.getTimePoints();
		const activeCompounds = [
			...new Set(ProfileManager.currentAdministrations.map((a) => a.compound)),
		];

		const datasets = activeCompounds.map((compound) => ({
			label: compoundData[compound].name,
			data: timePoints.map((time) => ({
				x: time,
				y: ProfileManager.currentAdministrations
					.filter((admin) => admin.compound === compound)
					.reduce(
						(total, admin) =>
							total +
							Utils.calculateLevel(
								admin,
								time,
								compoundData[compound].halfLife
							),
						0
					),
			})),
			borderColor: compoundData[compound].color,
			fill: false,
			tension: 0.4,
		}));

		if (this.chart) {
			this.chart.destroy();
		}

		const ctx = document.getElementById("chart")?.getContext("2d");
		if (!ctx) {
			console.error("Could not get chart context");
			return;
		}

		try {
			this.chart = new Chart(ctx, {
				type: "line",
				data: { datasets },
				options: {
					responsive: true,
					interaction: { intersect: false, mode: "index" },
					scales: {
						x: {
							type: "time",
							time: { unit: "day" },
							title: { display: true, text: "Date" },
						},
						y: {
							beginAtZero: true,
							title: { display: true, text: "Active Amount (mg)" },
						},
					},
				},
			});
		} catch (error) {
			console.error("Error creating chart:", error);
		}
	}
}

export const ChartManager = new ChartManagerClass();
