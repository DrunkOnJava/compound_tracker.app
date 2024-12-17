/**
 * Utility class providing common functionality across the application
 */
class UtilsClass {
	/**
	 * Generates time points for the chart display
	 * @returns {Date[]} Array of dates
	 */
	getTimePoints() {
		const now = new Date();
		const timePoints = [];
		let currentTime = new Date(now - 30 * 24 * 60 * 60 * 1000); // 30 days ago
		const endTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days ahead

		while (currentTime <= endTime) {
			timePoints.push(new Date(currentTime));
			currentTime.setHours(currentTime.getHours() + 6);
		}
		return timePoints;
	}

	/**
	 * Calculates compound level based on administration and half-life
	 * @param {Object} admin Administration data
	 * @param {Date} time Time point
	 * @param {number} halfLife Half-life in days
	 * @returns {number} Calculated level
	 */
	calculateLevel(admin, time, halfLife) {
		if (!admin?.date || !time || !halfLife) {
			return 0;
		}

		const timeDiff = (time - admin.date) / (24 * 60 * 60 * 1000);
		return timeDiff >= 0 ? admin.dose * Math.pow(0.5, timeDiff / halfLife) : 0;
	}

	/**
	 * Displays an alert message to the user
	 * @param {string} message Message to display
	 * @param {string} type Alert type ('error' | 'success' | 'warning')
	 */
	showAlert(message, type = "error") {
		const alert = document.getElementById("alert");
		if (!alert) {
			console.error("Alert element not found");
			return;
		}

		alert.textContent = message;
		alert.className = `alert alert-${type}`;
		alert.style.display = "block";

		setTimeout(() => {
			if (alert.style.display === "block") {
				alert.style.display = "none";
			}
		}, 3000);
	}

	/**
	 * Initializes date/time input with current time
	 */
	initializeDateTime() {
		const dateInput = document.getElementById("date");
		if (!dateInput) {
			console.error("Date input element not found");
			return;
		}

		const now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		dateInput.value = now.toISOString().slice(0, 16);
	}

	/**
	 * Formats a date for display
	 * @param {Date|string} date Date to format
	 * @returns {string} Formatted date string
	 */
	formatDate(date) {
		const parsed = new Date(date);
		return isNaN(parsed.getTime()) ? "Invalid Date" : parsed.toLocaleString();
	}

	/**
	 * Sanitizes a string by removing HTML tags
	 * @param {string} str String to sanitize
	 * @returns {string} Sanitized string
	 */
	sanitizeString(str) {
		return typeof str === "string" ? str.replace(/[<>]/g, "").trim() : "";
	}

	/**
	 * Validates a number is within range
	 * @param {number|string} value Value to validate
	 * @param {number} min Minimum value
	 * @param {number} max Maximum value
	 * @returns {boolean} Whether the number is valid
	 */
	validateNumber(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
		const num = parseFloat(value);
		return !isNaN(num) && num >= min && num <= max;
	}

	/**
	 * Validates a date
	 * @param {Date|string} date Date to validate
	 * @returns {boolean} Whether the date is valid
	 */
	validateDate(date) {
		if (!(date instanceof Date) && typeof date !== "string") return false;
		const timestamp = new Date(date).getTime();
		return !isNaN(timestamp) && timestamp > 0;
	}

	/**
	 * Sanitizes HTML content by removing scripts and tags
	 * @param {string} html HTML content to sanitize
	 * @returns {string} Sanitized content
	 */
	sanitizeHtml(html) {
		if (typeof html !== "string") return "";
		return html
			.replace(/<script[^>]*>.*?<\/script>/gi, "")
			.replace(/<[^>]*>/g, "")
			.trim();
	}

	/**
	 * Validates input based on type and options
	 * @param {any} value Value to validate
	 * @param {'number'|'date'|'string'} type Validation type
	 * @param {Object} options Validation options
	 * @returns {boolean} Whether the input is valid
	 */
	validateInput(value, type, options = {}) {
		switch (type) {
			case "number":
				return this.validateNumber(value, options.min, options.max);
			case "date":
				return this.validateDate(value);
			case "string":
				return (
					typeof value === "string" &&
					(!options.maxLength || value.length <= options.maxLength) &&
					(!options.minLength || value.length >= options.minLength)
				);
			default:
				return false;
		}
	}
}

export const Utils = new UtilsClass();
