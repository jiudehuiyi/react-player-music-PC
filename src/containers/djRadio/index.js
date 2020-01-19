import DjRadio from "../../components/djRadio";
import { connect } from 'react-redux';
import { djCateListAction,djCateListTypeAction,radioLeaderBorderAction } from "../../actions/discoverDjRadio"
const mapStateToProps = (state,ownProps)=>{
    return {
        diCateListData:state.djCateListReducer.data || {},
        djCateListTypeData:state.djCateListTypeReducer.data || {},
        radioLeaderBorderData:state.radioLeaderBorderReducer.data || {},
    };
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        djCateListFunc:(data)=>{
            dispatch( djCateListAction(data) );
        },
        djCateListTypeFunc:(data)=>{
            dispatch( djCateListTypeAction(data) );
        },
        radioLeaderBorderFunc:(data)=>{
            dispatch( radioLeaderBorderAction(data) );
        }

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DjRadio);