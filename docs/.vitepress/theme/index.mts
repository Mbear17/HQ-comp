import DefaultTheme from 'vitepress/theme';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { EnhanceAppContext, useRoute } from 'vitepress';
// @ts-ignore
import './custom.css';

export default {
    ...DefaultTheme,
    enhanceApp(ctx: EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);
        // 注册全局组件（可选）
        ctx.app.component('vImageViewer', vImageViewer);
    },
    setup() {
        const route = useRoute();
        // 启用插件
        imageViewer(route);
    }
};