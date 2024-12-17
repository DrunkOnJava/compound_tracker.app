/**
 * @typedef {Object} Risk
 * @property {string} hairLoss - Hair loss risk level
 * @property {string} bloating - Bloating risk level
 * @property {string} aggression - Aggression risk level or warning message
 */

/**
 * @typedef {Object} Benefits
 * @property {string} jointPainReduction - Level of joint pain reduction
 * @property {string} hungerStimulation - Level of hunger stimulation
 */

/**
 * @typedef {Object} Usage
 * @property {boolean} cutting - Whether compound is suitable for cutting
 * @property {boolean} bulking - Whether compound is suitable for bulking
 * @property {string} commonDosing - Common dosing protocol
 * @property {string[]} commonStrengths - Available compound strengths
 */

/**
 * @typedef {Object} CompoundInfo
 * @property {string} name - Full compound name
 * @property {string} scientificClass - Scientific classification
 * @property {number} halfLife - Half-life in days
 * @property {string} color - Hex color code for UI representation
 * @property {Risk} risks - Associated risks
 * @property {Benefits} benefits - Potential benefits
 * @property {Usage} usage - Usage information
 */

/**
 * Risk levels used throughout the application
 * @readonly
 * @enum {string}
 */
export const RiskLevels = {
	VERY_LOW: "Very Low",
	LOW: "Low",
	MODERATE: "Moderate",
	HIGH: "High",
	VERY_HIGH: "Very High",
};

/**
 * Scientific classifications for compounds
 * @readonly
 * @enum {string}
 */
export const ScientificClasses = {
	ANDROGEN_AAS: "Androgen and Anabolic Steroid",
	NOR_TESTOSTERONE: "19-nor Testosterone Derivative",
	DHT: "DHT Derivative",
	TESTOSTERONE: "Testosterone Derivative",
};

/** @type {Object.<string, CompoundInfo>} */
export const compoundData = {
	"test-e": {
		name: "Testosterone Enanthate",
		scientificClass: "Androgen and Anabolic Steroid",
		halfLife: 4.5,
		color: "#2ecc71",
		risks: {
			hairLoss: "High",
			bloating: "Moderate",
			aggression:
				"_*WARNING:* May cause increased aggression in sensitive individuals_",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Moderate",
		},
		usage: {
			cutting: false,
			bulking: true,
			commonDosing: "250-500mg every 3.5 days",
			commonStrengths: ["250mg/ml", "300mg/ml"],
		},
	},
	"test-c": {
		name: "Testosterone Cypionate",
		scientificClass: "Androgen and Anabolic Steroid",
		halfLife: 5,
		color: "#27ae60",
		risks: {
			hairLoss: "High",
			bloating: "Moderate",
			aggression:
				"_*WARNING:* May cause increased aggression in sensitive individuals_",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Moderate",
		},
		usage: {
			cutting: false,
			bulking: true,
			commonDosing: "250-500mg every 3.5 days",
			commonStrengths: ["200mg/ml", "250mg/ml"],
		},
	},
	"test-p": {
		name: "Testosterone Propionate",
		scientificClass: "Androgen and Anabolic Steroid",
		halfLife: 0.8,
		color: "#3498db",
		risks: {
			hairLoss: "High",
			bloating: "Low",
			aggression:
				"_*WARNING:* May cause increased aggression in sensitive individuals_",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Moderate",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "50-100mg every day",
			commonStrengths: ["100mg/ml"],
		},
	},
	"test-s": {
		name: "Testosterone Suspension",
		scientificClass: "Androgen and Anabolic Steroid",
		halfLife: 0.1,
		color: "#2980b9",
		risks: {
			hairLoss: "High",
			bloating: "Low",
			aggression: "High",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "High",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "25-50mg twice daily",
			commonStrengths: ["50mg/ml", "100mg/ml"],
		},
	},
	"test-u": {
		name: "Testosterone Undecanoate",
		scientificClass: "Androgen and Anabolic Steroid",
		halfLife: 16,
		color: "#16a085",
		risks: {
			hairLoss: "High",
			bloating: "Moderate",
			aggression: "Moderate",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Moderate",
		},
		usage: {
			cutting: false,
			bulking: true,
			commonDosing: "750-1000mg every 10-14 days",
			commonStrengths: ["250mg/ml"],
		},
	},
	deca: {
		name: "Nandrolone Decanoate",
		scientificClass: "19-nor Testosterone Derivative",
		halfLife: 7,
		color: "#8e44ad",
		risks: {
			hairLoss: "Low",
			bloating: "High",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "High",
			hungerStimulation: "High",
		},
		usage: {
			cutting: false,
			bulking: true,
			commonDosing: "300-600mg per week",
			commonStrengths: ["200mg/ml", "300mg/ml"],
		},
	},
	npp: {
		name: "Nandrolone Phenylpropionate",
		scientificClass: "19-nor Testosterone Derivative",
		halfLife: 2,
		color: "#9b59b6",
		risks: {
			hairLoss: "Low",
			bloating: "Moderate",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "High",
			hungerStimulation: "High",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "50-100mg every other day",
			commonStrengths: ["100mg/ml"],
		},
	},
	"tren-a": {
		name: "Trenbolone Acetate",
		scientificClass: "19-nor Testosterone Derivative",
		halfLife: 1,
		color: "#e74c3c",
		risks: {
			hairLoss: "Moderate",
			bloating: "Low",
			aggression: "_*HIGH RISK:* Known to significantly increase aggression_",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "50-100mg every day",
			commonStrengths: ["100mg/ml"],
		},
	},
	"tren-e": {
		name: "Trenbolone Enanthate",
		scientificClass: "19-nor Testosterone Derivative",
		halfLife: 5,
		color: "#c0392b",
		risks: {
			hairLoss: "Moderate",
			bloating: "Low",
			aggression: "_*HIGH RISK:* Known to significantly increase aggression_",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "200-400mg per week",
			commonStrengths: ["200mg/ml"],
		},
	},
	"tren-h": {
		name: "Trenbolone Hexahydrobenzylcarbonate",
		scientificClass: "19-nor Testosterone Derivative",
		halfLife: 7,
		color: "#d35400",
		risks: {
			hairLoss: "Moderate",
			bloating: "Low",
			aggression: "_*HIGH RISK:* Known to significantly increase aggression_",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "200-400mg per week",
			commonStrengths: ["100mg/ml"],
		},
	},
	"mast-p": {
		name: "Masteron Propionate",
		scientificClass: "DHT Derivative",
		halfLife: 0.8,
		color: "#f39c12",
		risks: {
			hairLoss: "Very High",
			bloating: "Very Low",
			aggression: "Moderate",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "100mg every other day",
			commonStrengths: ["100mg/ml"],
		},
	},
	"mast-e": {
		name: "Masteron Enanthate",
		scientificClass: "DHT Derivative",
		halfLife: 5,
		color: "#e67e22",
		risks: {
			hairLoss: "Very High",
			bloating: "Very Low",
			aggression: "Moderate",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "200-400mg per week",
			commonStrengths: ["200mg/ml"],
		},
	},
	"primo-e": {
		name: "Primobolan Enanthate",
		scientificClass: "DHT Derivative",
		halfLife: 5,
		color: "#f1c40f",
		risks: {
			hairLoss: "Low",
			bloating: "Very Low",
			aggression: "Very Low",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "400-800mg per week",
			commonStrengths: ["100mg/ml", "200mg/ml"],
		},
	},
	"primo-a": {
		name: "Primobolan Acetate",
		scientificClass: "DHT Derivative",
		halfLife: 0.8,
		color: "#f4d03f",
		risks: {
			hairLoss: "Low",
			bloating: "Very Low",
			aggression: "Very Low",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "100mg every other day",
			commonStrengths: ["100mg/ml"],
		},
	},
	var: {
		name: "Anavar",
		scientificClass: "DHT Derivative",
		halfLife: 0.5,
		color: "#2ecc71",
		risks: {
			hairLoss: "Low",
			bloating: "Very Low",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Very Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "20-50mg daily",
			commonStrengths: ["10mg", "20mg", "50mg"],
		},
	},
	win: {
		name: "Winstrol",
		scientificClass: "DHT Derivative",
		halfLife: 0.5,
		color: "#27ae60",
		risks: {
			hairLoss: "High",
			bloating: "Very Low",
			aggression: "Moderate",
		},
		benefits: {
			jointPainReduction: "Very Low",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "25-50mg daily",
			commonStrengths: ["10mg", "50mg"],
		},
	},
	eq: {
		name: "Boldenone Undecylenate",
		scientificClass: "Testosterone Derivative",
		halfLife: 14,
		color: "#3498db",
		risks: {
			hairLoss: "Low",
			bloating: "Low",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "Very High",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "300-600mg per week",
			commonStrengths: ["200mg/ml", "300mg/ml"],
		},
	},
	"bold-c": {
		name: "Boldenone Cypionate",
		scientificClass: "Testosterone Derivative",
		halfLife: 5,
		color: "#2980b9",
		risks: {
			hairLoss: "Low",
			bloating: "Low",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "High",
		},
		usage: {
			cutting: true,
			bulking: true,
			commonDosing: "300-600mg per week",
			commonStrengths: ["200mg/ml"],
		},
	},
	dbol: {
		name: "Dianabol",
		scientificClass: "Testosterone Derivative",
		halfLife: 0.2,
		color: "#e74c3c",
		risks: {
			hairLoss: "High",
			bloating: "Very High",
			aggression: "High",
		},
		benefits: {
			jointPainReduction: "Moderate",
			hungerStimulation: "High",
		},
		usage: {
			cutting: false,
			bulking: true,
			commonDosing: "20-50mg daily",
			commonStrengths: ["10mg", "25mg", "50mg"],
		},
	},
	tbol: {
		name: "Turinabol",
		scientificClass: "DHT Derivative",
		halfLife: 0.3,
		color: "#c0392b",
		risks: {
			hairLoss: "Moderate",
			bloating: "Low",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Moderate",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "40-60mg daily",
			commonStrengths: ["10mg", "20mg"],
		},
	},
	halo: {
		name: "Halotestin",
		scientificClass: "DHT Derivative",
		halfLife: 0.3,
		color: "#d35400",
		risks: {
			hairLoss: "High",
			bloating: "Very Low",
			aggression: "_*EXTREME RISK:* Known to cause severe aggression_",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Very Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "10-20mg daily",
			commonStrengths: ["5mg", "10mg"],
		},
	},
	anadrol: {
		name: "Anadrol",
		scientificClass: "DHT Derivative",
		halfLife: 0.3,
		color: "#e67e22",
		risks: {
			hairLoss: "High",
			bloating: "Very High",
			aggression: "High",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Very High",
		},
		usage: {
			cutting: false,
			bulking: true,
			commonDosing: "50-100mg daily",
			commonStrengths: ["50mg"],
		},
	},
	"primo-oral": {
		name: "Primobolan Oral",
		scientificClass: "DHT Derivative",
		halfLife: 0.2,
		color: "#f1c40f",
		risks: {
			hairLoss: "Low",
			bloating: "Very Low",
			aggression: "Very Low",
		},
		benefits: {
			jointPainReduction: "Low",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "50-100mg daily",
			commonStrengths: ["25mg"],
		},
	},
	prov: {
		name: "Proviron",
		scientificClass: "DHT Derivative",
		halfLife: 0.5,
		color: "#f4d03f",
		risks: {
			hairLoss: "Very High",
			bloating: "Very Low",
			aggression: "Low",
		},
		benefits: {
			jointPainReduction: "Very Low",
			hungerStimulation: "Low",
		},
		usage: {
			cutting: true,
			bulking: false,
			commonDosing: "25-50mg daily",
			commonStrengths: ["25mg"],
		},
	},
};
