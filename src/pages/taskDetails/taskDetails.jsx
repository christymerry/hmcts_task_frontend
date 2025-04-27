import React, { useEffect } from 'react'
import MainLayout from '../../components/layouts/mainLayout'
import {Button, Tag, Popconfirm} from "antd"
import { LeftOutlined  } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import TaskModal from '../../components/modals/taskModal/taskModal';
import axios from 'axios'
import { useState } from 'react';
import axiosInstance from '../../axios';
import dayjs from 'dayjs';

function TaskDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const[task,setTask ]= useState(null);
    const [editModal, setEditModal] = useState(false);
    

    useEffect(()=>{
        fetchData();
    },[id]);

    const fetchData = () => {
        axiosInstance.get(`/${id}`)
        .then(res => setTask(res.data[0]))
        .catch(err => console.error(err));
    }

    const onEditClick = () => {
        setEditModal(true)
    }

    const handleCancel = () => setEditModal(false);

    const handleOk = () => {
        fetchData();
        setEditModal(false)
    }

    const deleteTask = () => {
        axiosInstance.delete(`/${task.id}`);
        navigate('/');
    }

    let statusText = '';
    let tagColor = '';

    switch(task?.status) {
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

    if (!task) {
        return <MainLayout title="Task Details Page">No data Found</MainLayout>
    }
  return (
    <>
        <MainLayout title="Task Details Page" >
            <div className='flex justify-between mt-10 mb-10'>
                <div className='flex gap-4 items-center'>
                    <LeftOutlined onClick={() => navigate(-1)}/>
                    <h2 className='text font-semibold text-2xl'>{task.title}</h2>
                </div>
                <div className='flex gap-2'>
                    <Button type="primary" onClick={onEditClick}>Edit Task</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={deleteTask}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete Task</Button>
                    </Popconfirm>
                </div>
            </div>
            <div className='flex gap-20 items-center'>
                <p className='text-sm'>
                    <span className='text-slate-600 mr-3'>Due date :</span> 
                    <span className='font-medium'>
                        {dayjs(task.due_date).format('MMMM Do, YYYY')}
                    </span>
                </p>
                <div>
                    <span className='text-slate-600 mr-3 text-sm'>Status :</span> 
                    <Tag color={tagColor}>{statusText}</Tag>
                </div>
                
            </div>
            <div className='mt-5'>
                <p className='font-semibold text-slate-700'>Description:</p>
                <p className='text-slate-900'>{task.description}</p>
            </div>
        </MainLayout>
        <TaskModal 
            modalOpen={editModal}
            title="Edit Task"
            handleCancel={handleCancel}
            handleOk={handleOk}
            selectedTask={task}
        />
    </>
  )
}

export default TaskDetails