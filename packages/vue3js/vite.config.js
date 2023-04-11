import vue from '@vitejs/plugin-vue';
export default ({ command }) => {
    return {
        plugins: [vue()],
    };
};
