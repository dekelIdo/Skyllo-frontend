import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/app-header'
import { HomePage } from './pages/home-page'
import { WorkSpace } from './pages/workspace'
import { LoginSignup } from './cmps/login-signup'
import { TaskDetails } from './cmps/task-details'
import { BoardApp } from './pages/board-app'
import { useSelector } from 'react-redux'
import { HomePageHeader } from './cmps/header-home-page'


export const RootCmp = () => {
    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board)
    let backgroundStyle = board?.style?.bgImg.length > 9 ? 'backgroundImage' : 'backgroundColor'



    return (
        <div className='root-cmp'>
            {!user && <HomePageHeader />}
            {user &&
                <AppHeader />
            }
            {/* <div className='black-screen'></div> */}
           

                <main style={{ [backgroundStyle]: board?.style?.bgImg, objectFit: 'cover', backgroundSize: 'cover' }} className='main-app'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='login' element={<LoginSignup />} />
                        <Route path='workspace' element={<WorkSpace />} />
                        <Route path="workspace/board/:boardId" element={<BoardApp />} >
                            <Route path=":groupId/:taskId" element={<TaskDetails />} />
                        </Route>
                    </Routes>
                </main>
         
        </div>
    )
}


// Sign-up
// Login

// HomePage

// WorkSpace --> BoardList--->BoardPreview

// BoardApp--(BoardHeader)--->GroupList--->GroupPreview--->TaskList--->TaskPreview

// TaskDetails-->DynamicCmp

// DynamicCmp ( TaskMember,TaskLabel,TaskCover,TaskCopy,TasdDate,TaskAttachment,TaskCheckList)
