/**
 * MagicMirror² Module: MMM-CountDown
 *
 * Displays a countdown to a specific event/date
 *
 * By rxf-sys
 * MIT Licensed.
 */

Module.register("MMM-Countdown", {

	/**
	 * Default module configuration.
	 * These values can be overridden in the MagicMirror config.js file
	 */
	defaults: {
		event: "New Year 2026",
		date: "2026-01-01",
		showHours: true,
		showMinutes: true,
		showSeconds: true,
		showDays: true,
		showWeeks: false,
		customInterval: 1000,
		daysLabel: "d",
		hoursLabel: "h",
		minutesLabel: "m",
		secondsLabel: "s",
		weeksLabel: "w",
		useTextLabels: false,  // Use translation strings instead of abbreviations
		displayStyle: "row",    // "row" or "column"
		fadeSpeed: 2000,        // Fade animation speed in milliseconds
		showEnd: true,          // Show message when countdown reaches zero
		endText: "The event has started!",
		compactMode: false,     // Hide zero values
		timezone: null          // Use system timezone if null
	},

	/**
	 * Interval timer reference for cleanup
	 */
	updateInterval: null,

	/**
	 * Module start sequence.
	 * Called when module is loaded and DOM is ready.
	 */
	start: function() {
		Log.info("Starting module: " + this.name);

		// Validate configuration
		this.validateConfig();

		// Start the update interval
		this.startInterval();
	},

	/**
	 * Validate module configuration
	 */
	validateConfig: function() {
		// Validate date format
		const targetDate = new Date(this.config.date);
		if (isNaN(targetDate.getTime())) {
			Log.error(this.name + ": Invalid date format. Please use YYYY-MM-DD format.");
			this.config.date = "2026-01-01"; // Fallback date
		}

		// Validate interval (minimum 100ms to prevent performance issues)
		if (this.config.customInterval < 100) {
			Log.warn(this.name + ": customInterval too low, setting to 100ms minimum");
			this.config.customInterval = 100;
		}

		// Validate display style
		if (this.config.displayStyle !== "row" && this.config.displayStyle !== "column") {
			Log.warn(this.name + ": Invalid displayStyle, defaulting to 'row'");
			this.config.displayStyle = "row";
		}
	},

	/**
	 * Start the update interval
	 */
	startInterval: function() {
		const self = this;

		// Clear any existing interval
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
		}

		// Set new interval
		this.updateInterval = setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.customInterval);
	},

	/**
	 * Override suspend method.
	 * Called when module is hidden or suspended.
	 */
	suspend: function() {
		Log.log(this.name + " is suspended");

		// Clear the update interval to save resources
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
			this.updateInterval = null;
		}
	},

	/**
	 * Override resume method.
	 * Called when module is shown again.
	 */
	resume: function() {
		Log.log(this.name + " is resumed");

		// Restart the interval
		this.startInterval();

		// Update immediately
		this.updateDom(this.config.fadeSpeed);
	},

	/**
	 * Override notificationReceived method.
	 * Handle notifications from other modules or system.
	 */
	notificationReceived: function(notification, payload, sender) {
		if (notification === "DOM_OBJECTS_CREATED") {
			// All modules are loaded, DOM is ready
			Log.log(this.name + " received DOM_OBJECTS_CREATED");
		}
	},

	/**
	 * Request additional styles.
	 * @returns {string[]} Array of CSS file paths
	 */
	getStyles: function() {
		return ["MMM-CountDown.css"];
	},

	/**
	 * Request translations.
	 * @returns {object} Dictionary of translation files by language
	 */
	getTranslations: function() {
		return {
			en: "translations/en.json",
			de: "translations/de.json",
			es: "translations/es.json",
			fr: "translations/fr.json",
			nl: "translations/nl.json"
		};
	},

	/**
	 * Calculate time difference
	 * @returns {object} Object containing time components
	 */
	getTimeDifference: function() {
		const now = new Date();
		const target = new Date(this.config.date);
		let timeDiff = target - now;

		// Check if event has passed
		const isPast = timeDiff < 0;
		timeDiff = Math.abs(timeDiff);

		// Calculate time components
		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);

		return {
			isPast: isPast,
			weeks: weeks,
			days: days % 7,
			totalDays: days,
			hours: hours % 24,
			minutes: minutes % 60,
			seconds: seconds % 60
		};
	},

	/**
	 * Get label for time unit.
	 * @param {string} unit - Time unit (days, hours, minutes, seconds)
	 * @returns {string} Label string
	 */
	getLabel: function(unit) {
		if (this.config.useTextLabels) {
			return " " + this.translate(unit.toUpperCase());
		}

		switch(unit) {
			case "weeks": return this.config.weeksLabel;
			case "days": return this.config.daysLabel;
			case "hours": return this.config.hoursLabel;
			case "minutes": return this.config.minutesLabel;
			case "seconds": return this.config.secondsLabel;
			default: return "";
		}
	},

	/**
	 * Format time value with padding.
	 * @param {number} value - Time value
	 * @param {boolean} pad - Whether to pad with zero
	 * @returns {string} Formatted value
	 */
	formatValue: function(value, pad = true) {
		if (pad && value < 10) {
			return "0" + value;
		}
		return value.toString();
	},

	/**
	 * Build time component element.
	 * @param {number} value - Time value
	 * @param {string} label - Label for time unit
	 * @param {string} className - CSS class name
	 * @returns {HTMLElement} Time component element
	 */
	createTimeComponent: function(value, label, className) {
		const component = document.createElement("div");
		component.className = "countdown-component " + className;

		const valueElement = document.createElement("span");
		valueElement.className = "countdown-value bright";
		valueElement.innerHTML = this.formatValue(value);

		const labelElement = document.createElement("span");
		labelElement.className = "countdown-label dimmed";
		labelElement.innerHTML = label;

		component.appendChild(valueElement);
		component.appendChild(labelElement);

		return component;
	},

	/**
	 * Generate the DOM for the module.
	 * @returns {HTMLElement} The wrapper element
	 */
	getDom: function() {
		const wrapper = document.createElement("div");
		wrapper.className = "mmm-countdown-wrapper";

		// Event title
		const eventTitle = document.createElement("div");
		eventTitle.className = "countdown-event bright medium";
		eventTitle.innerHTML = this.config.event;
		wrapper.appendChild(eventTitle);

		// Get time difference
		const timeDiff = this.getTimeDifference();

		// Check if event has passed
		if (timeDiff.isPast && this.config.showEnd) {
			const endMessage = document.createElement("div");
			endMessage.className = "countdown-end xlarge bright";
			endMessage.innerHTML = this.config.endText;
			wrapper.appendChild(endMessage);
			return wrapper;
		}

		// Time container
		const timeContainer = document.createElement("div");
		timeContainer.className = "countdown-time " +
			(this.config.displayStyle === "column" ? "column-style" : "row-style");

		// Add time components
		if (this.config.showWeeks && (timeDiff.weeks > 0 || !this.config.compactMode)) {
			timeContainer.appendChild(
				this.createTimeComponent(timeDiff.weeks, this.getLabel("weeks"), "weeks")
			);
		}

		if (this.config.showDays && (timeDiff.days > 0 || timeDiff.weeks > 0 || !this.config.compactMode)) {
			const days = this.config.showWeeks ? timeDiff.days : timeDiff.totalDays;
			timeContainer.appendChild(
				this.createTimeComponent(days, this.getLabel("days"), "days")
			);
		}

		if (this.config.showHours && (timeDiff.hours > 0 || timeDiff.totalDays > 0 || !this.config.compactMode)) {
			timeContainer.appendChild(
				this.createTimeComponent(timeDiff.hours, this.getLabel("hours"), "hours")
			);
		}

		if (this.config.showMinutes && (timeDiff.minutes > 0 || timeDiff.hours > 0 || !this.config.compactMode)) {
			timeContainer.appendChild(
				this.createTimeComponent(timeDiff.minutes, this.getLabel("minutes"), "minutes")
			);
		}

		if (this.config.showSeconds) {
			timeContainer.appendChild(
				this.createTimeComponent(timeDiff.seconds, this.getLabel("seconds"), "seconds")
			);
		}

		wrapper.appendChild(timeContainer);

		return wrapper;
	}
});
