import { Utils } from "../utils/Utils.js";
import { AdminManager } from "./AdminManager.js";
import { ChartManager } from "./ChartManager.js";

class ProfileManagerClass {
	constructor() {
		this.currentProfile = localStorage.getItem("currentProfile") || "alex";
		this.profileData = JSON.parse(localStorage.getItem("profileData")) || {
			alex: [],
			griffin: [],
		};
	}

	get currentAdministrations() {
		return this.profileData[this.currentProfile] || [];
	}

	switchProfile(profile) {
		if (!profile || !this.profileData.hasOwnProperty(profile)) {
			console.error("Invalid profile:", profile);
			return;
		}

		try {
			this.currentProfile = profile;
			localStorage.setItem("currentProfile", profile);

			// Update UI
			document.querySelectorAll(".profile-card").forEach((card) => {
				card.classList.remove("active");
			});

			const profileCard = document.getElementById(`profile-${profile}`);
			if (profileCard) {
				profileCard.classList.add("active");
			}

			// Update data displays
			AdminManager.updateLog();
			ChartManager.updateChart();
			Utils.showAlert(`Switched to ${profile}'s profile`, "success");
		} catch (error) {
			console.error("Error switching profile:", error);
			Utils.showAlert("Error switching profile", "error");
		}
	}

	saveProfileData() {
		try {
			localStorage.setItem("profileData", JSON.stringify(this.profileData));
		} catch (error) {
			console.error("Error saving profile data:", error);
			Utils.showAlert("Error saving profile data", "error");
		}
	}

	addAdministration(administration) {
		if (!this.currentProfile) {
			console.error("No profile selected");
			return false;
		}

		try {
			if (!this.profileData[this.currentProfile]) {
				this.profileData[this.currentProfile] = [];
			}

			this.profileData[this.currentProfile].push(administration);
			this.saveProfileData();
			return true;
		} catch (error) {
			console.error("Error adding administration:", error);
			return false;
		}
	}

	deleteAdministration(id) {
		if (!this.currentProfile || !id) {
			console.error("Invalid deletion request");
			return false;
		}

		try {
			this.profileData[this.currentProfile] = this.profileData[
				this.currentProfile
			].filter((admin) => admin.id !== id);
			this.saveProfileData();
			return true;
		} catch (error) {
			console.error("Error deleting administration:", error);
			return false;
		}
	}
}

export const ProfileManager = new ProfileManagerClass();
