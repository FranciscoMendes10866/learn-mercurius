/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Comment: { // root type
    _id?: string | null; // String
    message?: string | null; // String
    post_id?: string | null; // String
    user_id?: string | null; // String
  }
  Mutation: {};
  Post: { // root type
    _id?: string | null; // String
    content?: string | null; // String
    title?: string | null; // String
    user_id?: string | null; // String
  }
  PostComments: { // root type
    _id?: string | null; // String
    content?: string | null; // String
    title?: string | null; // String
    user_id?: string | null; // String
  }
  Query: {};
  UserSignIn: { // root type
    _id?: string | null; // String
    email?: string | null; // String
    token?: string | null; // String
    username?: string | null; // String
  }
  UserSignUp: { // root type
    _id?: string | null; // String
    email?: string | null; // String
    password?: string | null; // String
    username?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Comment: { // field return type
    _id: string | null; // String
    message: string | null; // String
    post_id: string | null; // String
    user_id: string | null; // String
  }
  Mutation: { // field return type
    destroyComment: NexusGenRootTypes['Comment'] | null; // Comment
    destroyPost: NexusGenRootTypes['Post'] | null; // Post
    newComment: NexusGenRootTypes['Comment'] | null; // Comment
    newPost: NexusGenRootTypes['Post'] | null; // Post
    patchComment: NexusGenRootTypes['Comment'] | null; // Comment
    patchPost: NexusGenRootTypes['Post'] | null; // Post
    signIn: NexusGenRootTypes['UserSignIn'] | null; // UserSignIn
    signUp: NexusGenRootTypes['UserSignUp'] | null; // UserSignUp
  }
  Post: { // field return type
    _id: string | null; // String
    content: string | null; // String
    title: string | null; // String
    user_id: string | null; // String
  }
  PostComments: { // field return type
    _id: string | null; // String
    comments: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    content: string | null; // String
    title: string | null; // String
    user_id: string | null; // String
  }
  Query: { // field return type
    findPosts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    singlePost: NexusGenRootTypes['PostComments'] | null; // PostComments
  }
  UserSignIn: { // field return type
    _id: string | null; // String
    email: string | null; // String
    token: string | null; // String
    username: string | null; // String
  }
  UserSignUp: { // field return type
    _id: string | null; // String
    email: string | null; // String
    password: string | null; // String
    username: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Comment: { // field return type name
    _id: 'String'
    message: 'String'
    post_id: 'String'
    user_id: 'String'
  }
  Mutation: { // field return type name
    destroyComment: 'Comment'
    destroyPost: 'Post'
    newComment: 'Comment'
    newPost: 'Post'
    patchComment: 'Comment'
    patchPost: 'Post'
    signIn: 'UserSignIn'
    signUp: 'UserSignUp'
  }
  Post: { // field return type name
    _id: 'String'
    content: 'String'
    title: 'String'
    user_id: 'String'
  }
  PostComments: { // field return type name
    _id: 'String'
    comments: 'Comment'
    content: 'String'
    title: 'String'
    user_id: 'String'
  }
  Query: { // field return type name
    findPosts: 'Post'
    singlePost: 'PostComments'
  }
  UserSignIn: { // field return type name
    _id: 'String'
    email: 'String'
    token: 'String'
    username: 'String'
  }
  UserSignUp: { // field return type name
    _id: 'String'
    email: 'String'
    password: 'String'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    destroyComment: { // args
      id: string; // String!
    }
    destroyPost: { // args
      id: string; // String!
    }
    newComment: { // args
      message: string; // String!
      post_id: string; // String!
    }
    newPost: { // args
      content: string; // String!
      title: string; // String!
    }
    patchComment: { // args
      id: string; // String!
      message: string; // String!
      post_id: string; // String!
    }
    patchPost: { // args
      content: string; // String!
      id: string; // String!
      title: string; // String!
    }
    signIn: { // args
      email: string; // String!
      password: string; // String!
    }
    signUp: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
  }
  Query: {
    singlePost: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}