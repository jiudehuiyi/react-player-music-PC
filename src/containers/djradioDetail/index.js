import { connect } from 'react-redux';
import DjRadioDetail from "../../components/djradioDetail"
import { djDetailAction,djDetailListAction } from "../../actions/djDetail"
const getStateToProps = (state,ownProps)=>{
    return {
        djDetailData:state.djDetailReducer.data || {},
        djDetailListData:state.djDetailListReducer.data || {},
    }
}
const getDispatchToProps = (dispatch,ownProps)=>{
    return {
        djDetailFunc:(data)=>{
            dispatch( djDetailAction(data) )
        },
        djDetailList:(data)=>{
            dispatch( djDetailListAction(data) )
        }
    }
}


export default connect(getStateToProps,getDispatchToProps)(DjRadioDetail);