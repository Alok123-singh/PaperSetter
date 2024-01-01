import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Loading1, Card1 } from '../../../components/index'


function ParticipantHome() {
    const [loading, setLoading] = useState(false);


    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className = 'py-10 flex justify-evenly items-center dark:bg-gray-40  flex-wrap'>
            <Card1 imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXB-pdC3jlinrQ5Y9rLgR6F_gtPgk1W0ejT-laLKGbEDsllFqvFw39r0mExvLPHnK-7w&usqp=CAU' link='/inventory-management' title='Inventory Management' />

            <Card1 imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXB-pdC3jlinrQ5Y9rLgR6F_gtPgk1W0ejT-laLKGbEDsllFqvFw39r0mExvLPHnK-7w&usqp=CAU' link='/seating-allocation' title='Seating Allocation' />
        </div>
    )
}

export default ParticipantHome
