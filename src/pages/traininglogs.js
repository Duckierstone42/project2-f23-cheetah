import Sidebar from '../components/Sidebar'
import useId from '../hooks/useAuth'
import TrainingLogDisplay from '@/components/TrainingLogDisplay';
import styles from "@/styles/TrainingPage.module.css";
import {useState, useEffect} from "react";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
const sampleTrainingObject = {
    _id: "655ad54dd57dbc42b4779bca",
    user: "655712cf04789adf1b86d592",
    animal: "655acf6bb111395b7a319bec",
    title: "Complete Sit Lessons",
    date: "2020-09-21T04:00:00.000Z",
    description: "Lucy finishes the sit lessons very well today. Should give here a treat.",
    hours: 23,
    __v: 0
};
//I will likely need to call the database to get access to animal and user information when displaying the trainingLog.

export default function TrainingLogPage() {
    const {id, login, logout, admin} = useId();
    const [logList,setLogList] = useState([]);
    useEffect(() => {
        //Set training logList and everything
        async function createList() {
            const response = await fetch("/api/admin/training");
            const data = await response.json();
            setLogList(data);

        }
        createList();
    },[]);
    //Use useId() to do conditional rendering based on whether this user is an admin or not.
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <div className={styles.trainingStuff}>
            <div className = {styles.headerBox}>
            <div className={styles.header}>

                <span className={styles.contentType}>Training Logs</span>
                <span className={styles.create}>
                    <Image src={add} width="15"/>
                    Create new</span>
               
            </div>
            </div>
            {logList.map((logItem) => (
                <TrainingLogDisplay key={logItem._id} {...logItem} />
                //Key prop provides react with a unique identifier for each object, making it easier for it to render.
            ))}
            
            </div>
            
            
        </div>
        
    )
}