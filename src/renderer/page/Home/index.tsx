import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { SwipeAction, List, Card, WhiteSpace, ListView, Icon } from 'antd-mobile';
import { Link } from 'react-router-dom'
import formatter from '../../util/formatter'

import {Header} from '../../components/header/Header'

import { Store } from 'store/state';
import { getList, deleteNote } from '../../store/actions/note'

import './style.scss';


class Home extends Component<any, any> {
  ds
  constructor(props){
    super(props)
    this.ds =  new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    const { dataSource = new Map()} = props
    this.state = {
      dataSource: this.ds.cloneWithRows([...dataSource.values()].sort((d1, d2) => formatter.string2Milliseconds(d2.lastModify || d2.updatedAt) - formatter.string2Milliseconds(d1.lastModify || d1.updatedAt))),
    }
  }
  componentDidMount() {
    this.queryNoteList()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([...nextProps.dataSource.values()].sort((d1, d2) => formatter.string2Milliseconds(d2.lastModify || d2.updatedAt) - formatter.string2Milliseconds(d1.lastModify || d1.updatedAt))),
      });
    }
  }
  queryNoteList = () => {
    const { getList, dataSource} = this.props;
    if (!dataSource.size) {
      getList()
    }
  }
  renderCell = (item) => {
    const { deleteNote } = this.props
    const { id, title, content, lastModify, updatedAt/* = Date.now() */} = item
    const time = formatter.number2Date(lastModify || updatedAt)
    return (
      <div key={id}>
        <WhiteSpace size="lg" />
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: '取消',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: '删除',
              onPress: () => deleteNote({id}),
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
          onOpen={() => console.log('global open')}
          onClose={() =>  console.log('global close')}
        >
          <Link to={`/add?id=${id}&mode=Update`}>
            <Card full>
              <Card.Header
                title={title}
              />
              <Card.Body>
                <div>{content}</div>
              </Card.Body>
              <Card.Footer extra={<div>{time}</div>} />
            </Card>
          </Link>
        </SwipeAction>
       </div>
      )
  }
  render() {
    console.log("Home -> render -> this.state.dataSource", this.state.dataSource)
    return <div>
      <Header options={{
        title: "备忘录"
      }}/>
      <ListView
        // ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
        //   {'没有更多记录啦'}
        // </div>)}
        renderRow={this.renderCell}
        // renderSeparator={separator}
        className="am-list"
        // pageSize={4}
        useBodyScroll
        // onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        // onEndReached={this.onEndReached}
        // onEndReachedThreshold={10}
      />
      {/* {[...dataSource.values()].map(item => {
        return this.renderCell(item)
      })} */}
      <div className='add-new-note' onClick={this.jump}>
        <Link to={`/add?mode=Add`}>
          <Icon type='cross-circle' size='lg' color="#000000"/>
        </Link>
      </div>
    </div>
  }

}

export default connect(
  (state: Store) => {
    const { note } = state;
    const { dataSource } = note
    return {
      dataSource,
      // pagination
    };
  },
  (dispatch) => {
    return {
      getList: bindActionCreators(getList, dispatch),
      deleteNote: bindActionCreators(deleteNote, dispatch),
    }
  }
)(Home);