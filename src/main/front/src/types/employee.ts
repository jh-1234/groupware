export type Employee = {
  no?: number;
  empId: number;
  username?: string;
  password?: string;
  empName?: string;
  deptId?: number;
  deptName?: string;
  posId?: number;
  posName?: string;
  roleId?: number;
  roleName?: string;
  stateId?: number;
  stateName?: string;
  email?: string;
  tel?: string;
  birthday?: string;
  profileUrl?: string;
  hireDate?: string;
  resignDate?: string;
};

export type EmployeeSearchData = {
  departments: { deptId: number; deptName: string; deptAuthValue: number }[];
  positions: { posId: number; posName: string; posAuthValue: number }[];
  roles: { roleId: number; roleName: string; roleAuthValue: number }[];
  states: { stateId: number; stateName: string }[];
};
