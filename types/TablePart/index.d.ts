/// <reference types="react" />
interface tableProps {
    tableData: any;
    onChange: any;
    columns: any;
    className?: any;
}
declare const App: ({ columns, onChange, tableData: { data, page } }: tableProps) => JSX.Element;
export default App;
