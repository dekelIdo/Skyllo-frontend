import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { boardService } from '../services/board.new.service';
import { useEffect } from 'react';
import { useState } from 'react';

export function Diagram({ labelsBoardColors }) {

    useEffect(() => {
        getActivity()
    }, [])
    const [boardUsers, setBoardUsers] = useState()
    const [boardUsersActivities, setBoardUsersActivities] = useState()
    const [boardActivities, setBoardActivities] = useState()
    const params = useParams()
    const getActivity = async () => {
        try {
            const board = await boardService.getById(params.boardId)
            console.log(board);
            const usersBoard = board.activities.map(activity => {
                if (activity.byMember === null) return 'Guest'
                if (activity.byMember?.fullname) return activity.byMember.fullname
            })
            const activities = board.activities.map(activity => {
                if (activity.txt) return activity.txt
            })

            const boardActivities = [...new Set(activities)]

            setBoardActivities(boardActivities)
            console.log('boardActivities', boardActivities)
            const boardUsers = [...new Set(usersBoard)]
            let memberActiv = {}
            for (var i = 0; i < usersBoard.length; i++) {
                var currWord = usersBoard[i]
                var count = memberActiv[currWord]
                memberActiv[currWord] = count ? count + 1 : 1
            }
            console.log('memberActiv', memberActiv)

            setBoardUsers(boardUsers)
            setBoardUsersActivities(Object.values(memberActiv))
        } catch (err) {
            console.log(err);
        }
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
     
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white',
                    font: {
                        size: 0,

                    }
                }
            },
            title: {
                display: true,
                text: 'Users activity',
                color: "white"
            },
            
        },
        scales: {
            y: {
                ticks: {
                    color: "white", 
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",  
                    beginAtZero: true
                }
            }
        }
    };

    const labels = boardUsers;

    const data = {

        labels,
       
        datasets: [
            {
                label: 'Activity',
               
                data: boardUsersActivities,
                backgroundColor: labelsBoardColors,
                color: '#ffffff'

            },
        ],
        
    }
    


    return <Bar options={options} data={data} />;
}
