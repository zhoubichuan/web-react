/**
 * 将antd组件上的方法，子组件暴露到目标组件
 * 如：confirm, info, success 等方法挂载到 HljModal 上
 * Form.Item 挂载到 HljForm 上
 */
export declare const setExportsToComponent: (source: any, target: any) => void;
export declare const omit: (obj: object, fields: string[]) => {} & object;
export declare const imgPath: (path: any, type?: any, width?: any, height?: any, format?: any) => any;
export declare const checkSize: (item: any, onImageLoaded: any) => void;
export declare const checkSizeSync: (item: File) => Promise<unknown>;
