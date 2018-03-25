const commonTypes = `
  order: Int
  createdAt: Date
`;

export const types = `
  type DealBoard {
    _id: String!
    name: String!
    ${commonTypes}
  }

  type DealPipeline {
    _id: String!
    name: String!
    boardId: String!
    ${commonTypes}
  }

  type DealStage {
    _id: String!
    name: String!
    boardId: String
    pipelineId: String!
    amount: JSON
    ${commonTypes}
  }

  type Deal {
    _id: String!
    boardId: String
    pipelineId: String
    stageId: String!
    companyIds: [String]!
    customerIds: [String]!
    assignedUserIds: [String]
    amount: JSON
    closeDate: Date
    note: String
    companies: [Company]
    customers: [Customer]
    products: JSON
    assignedUsers: [User]
    ${commonTypes}
  }
`;

export const queries = `
  dealBoards: [DealBoard]
  dealBoardGetLast: DealBoard
  dealBoardDetail(_id: String!): DealBoard
  dealPipelines(boardId: String!): [DealPipeline]
  dealStages(boardId: String, pipelineId: String!): [DealStage]
  dealStageDetail(_id: String!): DealStage
  deals(boardId: String, pipelineId: String, stageId: String!): [Deal]
  dealDetail(_id: String!): Deal
`;

const dealMutationParams = `
  boardId: String,
  pipelineId: String,
  stageId: String!,
  assignedUserIds: [String],
  companyIds: [String],
  customerIds: [String],
  closeDate: Date!,
  note: String,
  order: Int,
  productsData: JSON
`;

export const mutations = `
  dealBoardsAdd(name: String!): DealBoard
  dealBoardsEdit(_id: String!, name: String!): DealBoard
  dealBoardsRemove(_id: String!): String

  dealPipelinesAdd(name: String!, boardId: String!, stages: JSON): DealPipeline
  dealPipelinesEdit(_id: String!, name: String!, boardId: String!, stages: JSON): DealPipeline
  dealPipelinesUpdateOrder(orders: [OrderItem]): [DealPipeline]
  dealPipelinesRemove(_id: String!): String

  dealStagesAdd(name: String!, boardId: String, pipelineId: String!): DealStage
  dealStagesEdit(
    _id: String!, name: String!, boardId: String, pipelineId: String!
  ): DealStage
  dealStagesChange(_id: String!, pipelineId: String!): DealStage
  dealStagesUpdateOrder(orders: [OrderItem]): [DealStage]
  dealStagesRemove(_id: String!): String

  dealsAdd(${dealMutationParams}): Deal
  dealsEdit(_id: String!, ${dealMutationParams}): Deal
  dealsChange( _id: String!, boardId: String, pipelineId: String, stageId: String!): Deal
  dealsUpdateOrder(orders: [OrderItem]): [Deal]
  dealsRemove(_id: String!): Deal
`;
