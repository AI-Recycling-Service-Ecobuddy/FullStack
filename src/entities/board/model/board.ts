import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    id: {
        type:String,
        required: true,
    },
    
    writer: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
    date: {
        type: String,
        required: true,
      },

   
  },
  {
    collection:'board'
  }
);

// 모델이 이미 존재하는 경우 기존 모델을 사용, 그렇지 않으면 새로 생성
const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);

export default Board;
