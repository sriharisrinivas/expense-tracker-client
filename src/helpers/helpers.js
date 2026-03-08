const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "expense-app");
    
    const response = await fetch(url, {
        method: 'post',
        body: formData
    });
    const responseData = await response.json();


    return responseData;
};

const getCurrenySymbol = (value, currency = 'INR') => {
    if (!value) return '-';  
    switch (currency) {
        case 'USD':
            return value +'$';
        case 'INR':
            return value + '₹';
        default:
            return '';
    }};

export { getCurrenySymbol };

export default uploadFile;