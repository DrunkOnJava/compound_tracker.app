/**
 * @typedef {Object} CompoundData
 * @property {string} scientificClass
 * @property {number} halfLife
 * @property {Object} risks
 * @property {string} risks.hairLoss
 * @property {string} risks.bloating
 * @property {string} risks.aggression
 * @property {Object} benefits
 * @property {string} benefits.jointPainReduction
 * @property {string} benefits.hungerStimulation
 * @property {Object} usage
 * @property {boolean} usage.cutting
 * @property {boolean} usage.bulking
 * @property {string} usage.commonDosing
 * @property {string[]} usage.commonStrengths
 */

import { compoundData } from "../data/compoundData.js";
import { Utils } from "../utils/Utils.js";

class CompoundManagerClass {
	/**
	 * Initializes the compound manager and sets up event listeners
	 */
	initialize() {
		const compoundSelect = document.getElementById("compound");
		if (!compoundSelect) {
			console.error("Compound select element not found");
			return;
		}

		compoundSelect.addEventListener("change", () => this.updateCompoundInfo());
		if (compoundSelect.value) {
			this.updateCompoundInfo();
		}
	}

	/**
	 * Updates the compound information display
	 */
	updateCompoundInfo() {
		const compound = document.getElementById("compound")?.value;
		const infoDiv = document.getElementById("compound-info");
		const detailsDiv = document.getElementById("compound-details");

		if (!infoDiv || !detailsDiv) {
			Utils.showAlert("Error: Required elements not found", "error");
			return;
		}

		// Show loading state
		infoDiv.style.display = "block";
		infoDiv.classList.add("loading");
		detailsDiv.innerHTML = this.templates.loading();

		// Simulate network delay for loading state demonstration
		setTimeout(() => {
			try {
				if (!compound || !compoundData?.[compound]) {
					throw new Error("Please select a compound");
				}

				const data = compoundData[compound];
				if (!this.validateCompoundData(data)) {
					throw new Error("Invalid compound data");
				}

				const sanitizedData = this.sanitizeCompoundData(data);
				if (!sanitizedData) {
					throw new Error("Error processing compound data");
				}

				detailsDiv.innerHTML = this.templates.compoundInfo(sanitizedData);
			} catch (error) {
				console.error("Error processing compound:", error);
				Utils.showAlert(error.message, "error");
				infoDiv.style.display = "none";
			} finally {
				infoDiv.classList.remove("loading");
			}
		}, 500);
	}

	/**
	 * Validates compound data structure
	 * @param {CompoundData} data Compound data to validate
	 * @returns {boolean} Whether the data is valid
	 */
	validateCompoundData(data) {
		if (!data || typeof data !== "object") {
			return false;
		}

		const requiredFields = [
			"scientificClass",
			"halfLife",
			"risks",
			"benefits",
			"usage",
		];

		return (
			requiredFields.every((field) => field in data) &&
			Utils.validateNumber(data.halfLife, 0, 100)
		);
	}

	/**
	 * Sanitizes compound data
	 * @param {CompoundData} data Data to sanitize
	 * @returns {CompoundData|null} Sanitized data or null if error
	 */
	sanitizeCompoundData(data) {
		try {
			return {
				scientificClass: Utils.sanitizeString(data.scientificClass),
				halfLife: parseFloat(data.halfLife),
				risks: {
					hairLoss: Utils.sanitizeString(data.risks.hairLoss),
					bloating: Utils.sanitizeString(data.risks.bloating),
					aggression: Utils.sanitizeString(data.risks.aggression),
				},
				benefits: {
					jointPainReduction: Utils.sanitizeString(
						data.benefits.jointPainReduction
					),
					hungerStimulation: Utils.sanitizeString(
						data.benefits.hungerStimulation
					),
				},
				usage: {
					cutting: Boolean(data.usage.cutting),
					bulking: Boolean(data.usage.bulking),
					commonDosing: Utils.sanitizeString(data.usage.commonDosing),
					commonStrengths: Array.isArray(data.usage.commonStrengths)
						? data.usage.commonStrengths.map((s) => Utils.sanitizeString(s))
						: [],
				},
			};
		} catch (error) {
			console.error("Error sanitizing compound data:", error);
			return null;
		}
	}

	/**
	 * HTML templates for compound information display
	 */
	templates = {
		/**
		 * Generates loading state HTML
		 */
		loading: () => `
            <section>
                <h4>Loading Compound Information</h4>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
            </section>
            <section>
                <h4>Properties</h4>
                <div class="skeleton-text"></div>
            </section>
            <section>
                <h4>Risks</h4>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
            </section>
            <section>
                <h4>Benefits</h4>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
            </section>
            <section>
                <h4>Usage</h4>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
            </section>
        `,

		/**
		 * Formats aggression risk display
		 * @param {string} aggression Aggression risk level
		 */
		aggressionRisk: (aggression) => {
			if (aggression.startsWith("_")) {
				const text = aggression.replace(/_\*|_/g, "");
				const level = text.toLowerCase().includes("high")
					? "high"
					: text.toLowerCase().includes("moderate")
						? "moderate"
						: "low";
				return `<div class="warning warning-${level}">${text}</div>`;
			}
			return `<p>Aggression Risk: <span class="risk risk-${aggression.toLowerCase()}">${aggression}</span></p>`;
		},

		/**
		 * Generates compound information HTML
		 * @param {CompoundData} data Sanitized compound data
		 */
		compoundInfo: (data) => `
            <section>
                <h4>Scientific Class</h4>
                <p>${data.scientificClass}</p>
            </section>

            <section>
                <h4>Properties</h4>
                <p>Half Life: ${data.halfLife} days</p>
            </section>

            <section>
                <h4>Risks</h4>
                <p>Hair Loss Risk: <span class="risk risk-${data.risks.hairLoss.toLowerCase()}">${data.risks.hairLoss}</span></p>
                <p>Bloating Risk: <span class="risk risk-${data.risks.bloating.toLowerCase()}">${data.risks.bloating}</span></p>
                ${CompoundManager.templates.aggressionRisk(data.risks.aggression)}
            </section>

            <section>
                <h4>Benefits</h4>
                <p>Joint Pain Reduction: ${data.benefits.jointPainReduction}</p>
                <p>Hunger Stimulation: ${data.benefits.hungerStimulation}</p>
            </section>

            <section>
                <h4>Usage</h4>
                <p>
                    ${data.usage.cutting ? '<span class="tag">Cutting</span>' : ""}
                    ${data.usage.bulking ? '<span class="tag">Bulking</span>' : ""}
                </p>
                <p>Common Dosing: ${data.usage.commonDosing}</p>
                <p>Common Strengths: ${data.usage.commonStrengths.join(", ")}</p>
            </section>
        `,
	};
}

export const CompoundManager = new CompoundManagerClass();
