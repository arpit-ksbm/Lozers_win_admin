export const DayMonthYear = (params) => {

    const date = new Date(params);
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };

    return date.toLocaleDateString('en-GB', optionsDate);
};

export const DayMonthYearWithTime = (params) => {

    const date = new Date(params);
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };

    return date.toLocaleString('en-GB', optionsDate);
}

export const OnlyTime = (params) => {

    const date = new Date(params);
    const optionsDate = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };

    return date.toLocaleString('en-GB', optionsDate);
}

export const YYYYMMDD = (params) => {
    const date = new Date(params);

    let year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1).padStart(2, '0');
    let day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const HideDateFromCurrent = (year = 0) => {
    let currentDate = new Date();

    let newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() - year);

    // Format the date as yyyy-mm-dd
    let formattedDate = newDate.toISOString().split("T")[0];
    return formattedDate;
};

export const DeepSearch = (data, searchText) => {
    const searchLower = searchText.toLowerCase();

    const DeepSearchObject = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(value => DeepSearchObject(value));
        }
        if (Array.isArray(obj)) {
            return obj.some(value => DeepSearchObject(value));
        }
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return obj.toString().toLowerCase().includes(searchLower);
        }
        return false;
    };

    return data && data.filter(item => DeepSearchObject(item));
};

export const DeepSearchSpace = (data, searchText) => {
    const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, '');

    const searchLower = normalizeText(searchText);

    const DeepSearchObject = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(value => DeepSearchObject(value));
        }
        if (Array.isArray(obj)) {
            return obj.some(value => DeepSearchObject(value));
        }
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return normalizeText(obj.toString()).includes(searchLower);
        }
        return false;
    };

    return data && data.filter(item => DeepSearchObject(item));
};

export const IndianRupee = (rupee) => {

    let Rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return `${Rupee.format(rupee)}/-`
    // return `${rupee}/-`
};

//! For XLXS File 
export const TransformData = (data) => {
    const headers = data[0];
    const transformed = data.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });
    return transformed;
};

export const GenerateOrderId = () => {
    const prefix = "PB-";

    // Get current date and time
    const now = new Date();

    // Extract date parts (year, month, day)
    const year = now.getFullYear().toString(); // Full year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(now.getDate()).padStart(2, '0');

    // Extract time parts
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Milliseconds for extra uniqueness

    // Combine date and time parts
    const dateTimeBasedNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    // Slice to get a 12-15 digit number
    const uniqueNumber = dateTimeBasedNumber.slice(0, 14); // Adjust slice for desired length (12 to 15)

    // Combine prefix and unique number
    const customId = `${prefix}${uniqueNumber}`;

    return customId;
}