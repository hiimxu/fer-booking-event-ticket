import bcrypt from 'bcrypt';

export const getListAdmin = async () => {
    try {
        const response = await request.get('admin');
        return response.data;
    } catch (error) {
        return error;
    }
};

export const loginAdmin = async (auth) => {
    let user;
    const response = await request.get(`admin?username=${auth.username}`);
    if (response.data.length > 0) {
        user = response[0];
    }

    if (!user) {
        return null;
    }
    if (
        user 
    ) {
        return user;
    }
    return user;
};
