import { connect } from 'react-redux'
import Search from '../../components/search'
import { searchDataAction } from '../../actions/search';


const mapStateToProps = (state,ownProps)=>{
    return {
        searchData:state.searchDataReducer.data||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        searchDataFunc:(data)=>{
            dispatch(searchDataAction(data))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Search)


