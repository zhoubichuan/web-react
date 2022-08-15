/// <reference types="react" />
import 'antd/lib/button/style';
import 'antd/lib/form/style';
import 'antd/lib/input/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
interface SearchProps {
    onRef: any;
    searchData: Function;
    requestUrl: String;
    className?: any;
}
declare const App: (props: SearchProps) => JSX.Element;
export default App;
