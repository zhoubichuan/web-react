/// <reference types="react" />
import 'antd/lib/modal/style';
interface Props {
    showDialod: boolean;
    changeDialog: Function;
    children: any;
}
declare const App: ({ showDialod, changeDialog, children }: Props) => JSX.Element;
export default App;
