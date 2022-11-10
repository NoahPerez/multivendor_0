export const toResponseModel = (databaseDoc: any, DomainModel: any): any => {
  return new DomainModel({ ...databaseDoc });
};

// module.exports = {
//   toResponseModel,
// };
