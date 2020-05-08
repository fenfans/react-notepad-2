import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import qs from 'qs'
import { TextareaItem, Button } from 'antd-mobile';
import throttle from 'lodash/throttle'

import { Store } from 'store/state';

import { getList, addNote, updateNote, deleteNote } from '../../store/actions/note'
import {Header} from '../../components/header/Header'
import './style.scss'
enum Mode {
    Add = 'Add',
    Update = 'Update'
}
interface State {
    mode: Mode;
    id: string;
    title: string;
    content: string;
}
class Home extends Component<any, State> {
    autoFocusInst: any
    customFocusInst: any
    query: any;
    mode: Mode
    constructor(props) {
        super(props)
        this.query = qs.parse(props.location.search,  { ignoreQueryPrefix: true })
        const { mode = Mode.Add, id = '' } = this.query
        this.mode = mode
        this.state = {
            mode,
            id,
            ...this.queryNoteDetail()
        }
    }
    isUpdateMode = () => (this.mode === Mode.Update && !!this.query.id)

    componentDidMount() {
        this.autoFocusInst.focus();
        this.queryNoteList()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource.size && !this.state.title && this.isUpdateMode()) {
            this.setState({
                ...this.queryNoteDetail()
            })
        }
    }
    queryNoteList = () => {
        const { getList, dataSource} = this.props;
        if (!dataSource.size) {
          getList()
        }
      }
    queryNoteDetail = () => {
        const {dataSource} = this.props
        const {title = '', content = ''} = dataSource.get(this.query.id) || {}
        return {
            title,
            content
        }
    }
    onSave = throttle(() => {
        if (this.isUpdateMode()) {
            this.onUpdate()
        } else {
            this.onAdd()
        }
        history.go(-1)
    }, 200)
    onAdd = () => {
        const { title, content } = this.state
        const { addNote } = this.props

        addNote({title, content})
    }
    onDelete = throttle(() => {
        const { id, title, content } = this.state
        const { deleteNote } = this.props
        deleteNote({id})
    }, 200)
    onUpdate = () => {
        const { id, title, content } = this.state
        const { updateNote } = this.props
        updateNote({id, title, content})
    }
    handleTitleChange = throttle((e) => {
        this.setState({
            title: e
        })
        console.log("Home -> handleTitleChange -> e", e)
    }, 100)
    handleContentChange = throttle((e) => {
        this.setState({
            content: e
        })
        console.log("Home -> handleContentChange -> e", e)
    }, 100)

    render() {
        const { title, content } = this.state
        return (
            <div className='page-add-wrapper'>
                <Header options={{
                    left: {show: true, onClick:() => {
                        // this.onSave()
                        history.go(-1)}
                    },
                    title: ""
                }}/>
                <TextareaItem
                    value={title}
                    placeholder="标题"
                    // data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                    // autoHeight
                    rows={1}
                    onChange={this.handleTitleChange}
                />
                <TextareaItem
                    value={content}
                    placeholder="备忘录详情"
                    // data-seed="logId"
                    autoHeight
                    ref={el => this.customFocusInst = el}
                    onChange={this.handleContentChange}
                />
                <div className='footer'>
                    <Button type="primary" onClick={this.onSave}>完成</Button>
                </div>
            </div>
    )}
   
}

export default connect(
    (state: Store) => {
        const { note } = state;
        const { dataSource } = note
        return {
            dataSource: dataSource
        };
    },
    (dispatch) => {
        return {
            getList: bindActionCreators(getList, dispatch),
            addNote: bindActionCreators(addNote, dispatch),
            // queryDetail: bindActionCreators(queryDetail, dispatch),
            updateNote: bindActionCreators(updateNote, dispatch),
            deleteNote: bindActionCreators(deleteNote, dispatch),
        }
    }
)(Home);