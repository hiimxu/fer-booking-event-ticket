import * as request from '~/lib/httpRequest';

export const getListAdmin = async () => {
    try {
        const response = await request.get('admin');
        return response.data;
    } catch (error) {
        return error;
    }
};
