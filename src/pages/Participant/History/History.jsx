import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Loading, Pagination } from '../../../components/index'


function History() {

    const [history,setHistory] = useState([]);
    const username = useSelector(state => state.auth.username);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const fetchHistory = async (username) => {
        setLoading(true);
        setError('');

        let errors = [];

        try{
            const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
            const response = await fetch(`http://localhost:8081/simlearn/score/api/v1/student/find/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                },
            });
            const data = await response.json();

            if(data.length !== 0)
                setHistory(data.reverse());

        }
        catch(err){
            errors.push(err);
            console.log("History error :",err);
        }

        if(errors.length > 0){
            setError(errors);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchHistory(username);

    }, []);

    const historyColumns = [
        {
            header : 'Exam Type',
            dataKey: 'examType', 
            label: 'Exam Type', 
            dataRender: (index,title) => {
                const words = title.toLowerCase().split('_');
                const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
                return formattedWords.join(' ');
            }
        },
        {
            header : 'Score',
            dataKey: 'score', 
            label: 'Score', 
            dataRender: (index,score) => {
                return parseFloat(score).toFixed(2).toString() + '';
            } 
        },
        {
            header : 'Time',
            dataKey: 'time', 
            label: 'Timestamp', 
            dataRender: (index,timestamp) => {
                const options = { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: true,
                };
                
                const formattedDate = new Date(timestamp).toLocaleString('en-US', options);
                return formattedDate;
            }
        },
    ];

    return loading ? (
        <Loading />

    ) : (
        <div className='w-full justify-center items-center'>
            {(error && error.length > 0) && <div className='flex flex-col'>
                {
                    error.map((err,index) => 
                    (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                }
            </div>}
            <Pagination columns={historyColumns} items={history} showRowNumbers={true} />
        </div>
    );
}

export default History
