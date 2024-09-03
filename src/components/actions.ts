export const setUserData = (userData: any) => ({
  type: 'SET_USER_DATA',
  payload: { userData },
});

export const setCompanyData = (companyData: any) => ({
  type: 'SET_COMPANY_DATA',
  payload: companyData,
});
