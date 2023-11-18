import Table from './components/Table';
import Query from './components/Query';
import './index.css'


function App() {

    
    return (
        <div className='w-full h-auto flex flex-col flex-wrap justify-center items-center'>
            <Query />
            
            <Table />
        </div>
    );
}

export default App
