import { Utils } from "../utils/Utils.js";
import { ProfileManager } from "./ProfileManager.js";
import { ChartManager } from "./ChartManager.js";
import { CompoundManager } from "./CompoundManager.js";
import { compoundData } from "../data/compoundData.js";

/**
 * @typedef {Object} Administration
 * @property {number} id - Unique identifier
 * @property {string} compound - Compound identifier
 * @property {number} dose - Dosage amount
 * @property {Date} date - Administration date
 */

/**
 * Manages compound administration entries and UI interactions
 */
class AdminManagerClass {
	/**
	 * Handles form submission for new administration entries
	 * @param {Event} event - Form submission event
	 */
	handleSubmit(event) {
		event.preventDefault();
		const form = event.target;

		try {
			const compound = form.compound.value;
			const dose = parseFloat(form.dose.value);
			const date = form.date.value;

			if (!this.validateForm(compound, dose, date)) {
				return;
			}

			const newAdmin = {
				id: Date.now(),
				compound,
				dose,
				date: new Date(date),
			};

			if (ProfileManager.addAdministration(newAdmin)) {
				this.updateLog();
				ChartManager.updateChart();
				CompoundManager.updateCompoundInfo();
				Utils.showAlert("Entry added successfully", "success");
				form.reset();
				Utils.initializeDateTime();
			} else {
				Utils.showAlert("Error adding entry", "error");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			Utils.showAlert("Error submitting form", "error");
		}
	}

	/**
	 * Validates form input values
	 * @param {string} compound - Selected compound
	 * @param {number} dose - Entered dose
	 * @param {string} date - Selected date
	 * @returns {boolean} Whether the form is valid
	 */
	validateForm(compound, dose, date) {
		if (!compound || !compoundData[compound]) {
			Utils.showAlert("Please select a valid compound");
			return false;
		}
		if (!Utils.validateNumber(dose, 0)) {
			Utils.showAlert("Please enter a valid dose");
			return false;
		}
		if (!Utils.validateDate(date)) {
			Utils.showAlert("Please select a valid date and time");
			return false;
		}
		return true;
	}

	/**
	 * Deletes an administration entry
	 * @param {number} id - Administration entry ID
	 */
	deleteAdministration(id) {
		try {
			if (ProfileManager.deleteAdministration(id)) {
				this.updateLog();
				ChartManager.updateChart();
				Utils.showAlert("Entry deleted successfully", "success");
			} else {
				Utils.showAlert("Error deleting entry", "error");
			}
		} catch (error) {
			console.error("Error deleting administration:", error);
			Utils.showAlert("Error deleting entry", "error");
		}
	}

	/**
	 * Updates the administration log display
	 */
	updateLog() {
		const logBody = document.getElementById("log-body");
		if (!logBody) {
			console.error("Log body element not found");
			return;
		}

		try {
			const administrations = ProfileManager.currentAdministrations;
			const sortedAdmins = [...administrations].sort((a, b) => b.date - a.date);

			logBody.innerHTML = sortedAdmins
				.map((admin) => this.createLogEntry(admin))
				.join("");
		} catch (error) {
			console.error("Error updating log:", error);
			Utils.showAlert("Error updating administration log", "error");
		}
	}

	/**
	 * Creates HTML for a log entry
	 * @param {Administration} admin - Administration entry
	 * @returns {string} HTML string for the log entry
	 */
	createLogEntry(admin) {
		const compound = compoundData[admin.compound];
		if (!compound) {
			console.error("Unknown compound:", admin.compound);
			return "";
		}

		return `
            <tr>
                <td>${Utils.formatDate(admin.date)}</td>
                <td>${Utils.sanitizeString(compound.name)}</td>
                <td>${Utils.sanitizeString(admin.dose.toString())}</td>
                <td>
                    <button class="btn btn-danger" 
                        onclick="AdminManager.deleteAdministration(${admin.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
	}
}

export const AdminManager = new AdminManagerClass();
