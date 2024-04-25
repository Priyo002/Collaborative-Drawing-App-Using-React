import mongoose,{Schema} from "mongoose";
import { type } from "os";


const boardSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            index: true,
        },
        elements: [
            {   
                type: Object,
            }
        ]
    },
    {timestamps: true}
)

export const Board = mongoose.model('Board',boardSchema);