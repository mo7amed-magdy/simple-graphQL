import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { categoryModel } from "../databases/category.model.js";

let categoryType = new GraphQLObjectType({
    name:"categoryType",
    fields:{
        name:{
            type:GraphQLString  
        },
        _id:{type:GraphQLID}
    }
})

const rootQuery = new GraphQLObjectType({
    name:"rootQuery",
    fields:{
        getCtegories:{
            type:new GraphQLList(categoryType),
            resolve:async()=>{
                let categories = await categoryModel.find();
                return categories;
            }
        }
    }
})

const rootMutation = new GraphQLObjectType({
    name:"rootMutation",
    fields:{
        addCategory:{
            type:categoryType,
            args:{
                name:{type:GraphQLString}
            },
            resolve:async(parent,args)=>{
                let category = new categoryModel({name:args.name});
                 await category.save();
                 return category;
            }
        },
        deleteCategory:{
            type: categoryType,
            args: {
                id: { type: GraphQLID } 
            },
            resolve: async (parent, args) => {
                try {
                    // Find the category by ID and remove it
                    let deletedCategory = await categoryModel.findByIdAndDelete(args.id);
                    if (!deletedCategory) {
                        throw new Error("Category not found");
                    }
                    return deletedCategory; // Return the deleted category
                } catch (error) {
                    throw new Error("Error deleting category: " + error.message);
                }
            }

        }
    }
})

export const schema = new GraphQLSchema({
    query:rootQuery,
    mutation:rootMutation
})