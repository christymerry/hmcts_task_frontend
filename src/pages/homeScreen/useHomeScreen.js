import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import axios from 'axios'
import dayjs from "dayjs";

const useHomeScreen = ()=>{

    const [dataSource,setDataSource] = useState([]);
    const [searchParams, setSearchParams] = useState({
      subject : '',
      status : 'all'
    })
    const[isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
      fetchData();
    },[]);


    const fetchData = () => {
      axios.get('http://localhost:3000/api/tasks')
        .then(res => setDataSource(res.data))
        .catch(err => console.error(err))
    }

    const filteredData = dataSource.filter((data) => {
      const matchesSubject = searchParams.subject === '' || data.title.toLowerCase().includes(searchParams.subject.toLowerCase());

      const matchesStatus = searchParams.status === 'all' || searchParams.status === data.status;

      return matchesSubject && matchesStatus;
    })
    
    const columns=[
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render : (status) => {
            let statusText = '';
            let tagColor = '';
            switch(status) {
              case 'New':
                statusText = "New";
                tagColor = "blue";
                break;
              case 'InProgress':
                statusText = "In Progress";
                tagColor = "orange";
                break;
              case 'Completed':
                statusText = "Completed";
                tagColor = "green";
                break;
              default:
                statusText = "Undefined";
                tagColor = "";
            }

            return React.createElement(Tag, { color: tagColor }, statusText);
          }
        },
        {
          title: 'Due Date',
          dataIndex: 'due_date',
          key: 'due_date',
          render: (due_date) => dayjs(due_date).format('MMMM Do, YYYY'),
        },
      ];


      const addTask =()=>{
        setIsModalOpen(true);
      }

      const handleCancel =()=>{
        setIsModalOpen(false);
      }
      const handleOk = () =>{
        fetchData();
        setIsModalOpen(false);
      }

      const showTaskDetails = (id) => {
        navigate(`/${id}`);
      }

    return {

        columns,dataSource,addTask,isModalOpen,handleCancel, handleOk,
        showTaskDetails,
        filteredData,
        searchParams,
        setSearchParams

    }
}

export default useHomeScreen