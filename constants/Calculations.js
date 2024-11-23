// Add this to your existing Calculations.js file

/**
 * Calculate run progress for both time and distance
 * @param {string} metricType - 'Time' or 'Distance'
 * @param {number} current - Current value (seconds for time, miles for distance)
 * @param {number} target - Target value (minutes for time, miles for distance)
 * @returns {string} Formatted progress percentage
 */
export const calculateRunProgress = (metricType, current, target) => {
    try {
        if (!metricType || current === undefined || target === undefined) {
            return '0.0%';
        }

        // Ensure values are numbers
        const safeCurrent = Number(current) || 0;
        let safeTarget = Number(target) || 1;

        // Convert target time to seconds
        if (metricType === 'Time') {
            safeTarget *= 60; // Convert minutes to seconds
        }

        // Calculate percentage
        const percentage = (safeCurrent / safeTarget) * 100;
        
        // Smooth the progress (0.1% increments)
        const smoothedPercentage = Math.floor(percentage * 10) / 10;
        
        // Ensure between 0-100%
        const boundedPercentage = Math.min(100, Math.max(0, smoothedPercentage));

        return `${boundedPercentage.toFixed(1)}%`;
    } catch (error) {
        console.error('Progress calculation error:', error, {
            metricType,
            current,
            target
        });
        return '0.0%';
    }
};

// Your existing calculations remain the same...
export const getDayName = () => {
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return days[new Date().getDay()];
};

export const getTimeOfDay = () => {
    var currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Morning';  
    } else if (currentHour < 18) {
        return 'Afternoon';
    } else {
        return 'Evening';
    }
};

export const calDistance = (lat1, lon1, lat2, lon2) => {
    const toRadian = angle => (Math.PI / 100) * angle;
    const distance = (a, b) => (Math.PI / 100) * (a - b);

    const RADIUS_OF_EARTH_IN_MILES = 3958.8;
    const dLat = distance(lat2, lat1);
    const doLon = distance(lon2, lon1);

    const a = 
        Math.pow(Math.sin(dLat / 2), 2) + 
        Math.pow(Math.sin(doLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_MILES * c;

    return finalDistance.toFixed(2);
};

export const formatTime = (timeElapsed) => {
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor((timeElapsed % 3600) / 60);
    const seconds = timeElapsed % 60;
    
    if (hours === 0) {
        return {
            hours,
            minutes,
            seconds,
            formatted: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
    }
    
    return {
        hours,
        minutes,
        seconds,
        formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };
};

export const calculatePace = (distance, timeElapsed, formatWithQuotes = true) => {
    if (distance <= 0 || timeElapsed <= 0) return formatWithQuotes ? "-'--\"" : "--:--";
    
    const paceInMinutes = (timeElapsed / 60) / distance;
    const minutes = Math.floor(paceInMinutes);
    const seconds = Math.floor((paceInMinutes - minutes) * 60);
    
    if (formatWithQuotes) {
        return `${minutes}'${seconds.toString().padStart(2, '0')}"`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
};

export const calculateCalories = (distance, weight = 200) => {
    const MET = 10;
    const avgSpeedMPH = 6;
    const hours = distance / avgSpeedMPH;
    
    return Math.round(MET * weight * hours);
};

// Original progress calculation can stay as backup
export const calculateProgress = (current, target) => {
    if (target <= 0) return '0%';
    const percentage = (current / target) * 100;
    return `${Math.min(100, Math.max(0, Math.round(percentage)))}%`;
};

export const milesToKm = (miles) => {
    return (miles * 1.60934).toFixed(2);
};

export const kmToMiles = (km) => {
    return (km * 0.621371).toFixed(2);
};