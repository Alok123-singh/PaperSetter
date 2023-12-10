import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Loading, Pagination } from '../../../components/index'


function History() {

    const [history,setHistory] = useState([]);
    const username = useSelector(state => state.auth.username);
    const [loading,setLoading] = useState(false);

    const fetchHistory = async (username) => {
        setLoading(true);

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
            console.log("Fetch history error :",err);
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
            render: (title) => {
                const words = title.toLowerCase().split('_');
                const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
                return formattedWords.join(' ');
            }
        },
        {
            header : 'Score',
            dataKey: 'score', 
            label: 'Score', 
            render: (score) => {
                return parseFloat(score).toFixed(2).toString() + '';
            } 
        },
        {
            header : 'Time',
            dataKey: 'time', 
            label: 'Timestamp', 
            render: (timestamp) => {
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

        <Pagination columns={historyColumns} items={history} />
    );
}

export default History
