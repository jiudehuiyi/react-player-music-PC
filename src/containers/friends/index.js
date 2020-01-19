import { connect } from 'react-redux';
import Friends from "../../components/friends"
import { friendsDataAction } from "../../actions/friends"
const mapStateToProps = (state,ownProps)=>{
    return {
       firendsData:state.friendsDataReducer.data
    };
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        friendsFunc:(data)=>{
            dispatch( friendsDataAction(data) )
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Friends);

