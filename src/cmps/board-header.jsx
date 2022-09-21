
import { useDispatch } from 'react-redux';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/board.actions';

//icons
import { ReactComponent as SvgStar } from '../assets/img/star.svg';
import { ReactComponent as InviteMemberIcon } from '../assets/img/invite-member-icon.svg';
import { ReactComponent as MenuIcon } from '../assets/img/more-options-icon.svg';
import { ReactComponent as CloseUsersModalIcon } from '../assets/img/close-task-form.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { userService } from '../services/user.service';

export function BoardHeader({ board }) {
    const dispatch = useDispatch()
    const members = board.members
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)
    const [users , setUsers] = useState(null)



    if (!board.isPopoverShown) board.isPopoverShown = false
    const onSetIsStared = async (boardId) => {
        try {
            const board = await boardService.getById(boardId)
            const boadToUpdate = { ...board, style: { ...board.style, isStared: !board.style.isStared } }
            dispatch(updateBoard(boadToUpdate))
        } catch (err) {
            console.log(err);
        }
    }
    const onShownPopover = () => {
        board.isPopoverShown = !board.isPopoverShown
        const boardToUpdate = { ...board }
        dispatch(updateBoard(boardToUpdate))

    }

    const loadUsers = async () => {
       const users = await userService.getUsers()
        try{
            setUsers(users)
            console.log('usssssssssssssssssssssssss',users)
        }
        catch{
            console.log('cannot load users')
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])


    const getMemberBackground = (member) => {
        if (member.img) return `url(${member.img}) center center / cover`
        else return `url(https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
    }
    const getUserBackground = (user) => {
        if (user.imgUrl) return `url(${user.imgUrl}) center center / cover`
        else return `url(https://res.cloudinary.com/skello-dev-learning/image/upload/v1643564751/dl6faof1ecyjnfnknkla.svg) center center / cover;`
    }



    return (
        <section className="board-header ">

            <nav className="board-header main-container">
                <div className="nav-left">
                    <h1>{board.title}</h1>
                    <div className="board-header-nav-left-actions">
                        <div className="board-header-favorite-icon action-board-header">
                            {board.style.isStared ? <img onClick={() => onSetIsStared(board._id)} className='star-app-header' src={require('../assets/img/star.png')} />
                                : <SvgStar onClick={() => onSetIsStared(board._id)} className='star-board-preview' />}
                        </div>
                        <div className='board-header-members-container'>
                            {members && members.map(member => {
                                return <div key={member._id} className='board-header-member-box' style={{ background: getMemberBackground(member) }}></div>
                            })}
                        </div>

                        <div className='invite-member-icon' onClick={() => setIsMembersModalOpen(!isMembersModalOpen)}>
                            <InviteMemberIcon />
                        </div>

                        {!isMembersModalOpen &&
                            <section className='board-header-users-modal'>

                                <div className='users-modal-header'>
                                    <span>Invite users to board</span>
                                    <CloseUsersModalIcon className='close-users-modal-icon' onClick={() => setIsMembersModalOpen(!isMembersModalOpen)} />
                                </div>
                                <div className='users-modal-content'>

                                    <div className='users-modal-users-list'>

                                        { users.map(user => {
                                            return <div className='users-modal-user-preview'> <div key={user._id} className='users-modal-user-box' style={{ background: getUserBackground(user) }}></div>
                                                <span>{user.fullname}</span>
                                            </div>
                                        })}
                                    </div>
                                </div>

                            </section>
                        }

                    </div>
                </div>

                <div className="nav-right">
                    <div className='board-header-menu-btn'>
                        <MenuIcon />
                        <p onClick={onShownPopover}>Show Menu</p>
                    </div>
                </div>

            </nav>
        </section>
    )
}