import { Member, Plan, Membership, DashboardStats } from '../types';

export const storageUtils = {
  getMembers: (): Member[] => {
    return JSON.parse(localStorage.getItem('flextrack_members') || '[]');
  },

  saveMembers: (members: Member[]): void => {
    localStorage.setItem('flextrack_members', JSON.stringify(members));
  },

  addMember: (member: Member): void => {
    const members = storageUtils.getMembers();
    members.push(member);
    storageUtils.saveMembers(members);
  },

  updateMember: (id: string, updates: Partial<Member>): void => {
    const members = storageUtils.getMembers();
    const index = members.findIndex(m => m.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...updates };
      storageUtils.saveMembers(members);
    }
  },

  deleteMember: (id: string): void => {
    const members = storageUtils.getMembers();
    storageUtils.saveMembers(members.filter(m => m.id !== id));
  },

  getPlans: (): Plan[] => {
    return JSON.parse(localStorage.getItem('flextrack_plans') || '[]');
  },

  savePlans: (plans: Plan[]): void => {
    localStorage.setItem('flextrack_plans', JSON.stringify(plans));
  },

  addPlan: (plan: Plan): void => {
    const plans = storageUtils.getPlans();
    plans.push(plan);
    storageUtils.savePlans(plans);
  },

  updatePlan: (id: string, updates: Partial<Plan>): void => {
    const plans = storageUtils.getPlans();
    const index = plans.findIndex(p => p.id === id);
    if (index !== -1) {
      plans[index] = { ...plans[index], ...updates };
      storageUtils.savePlans(plans);
    }
  },

  deletePlan: (id: string): void => {
    const plans = storageUtils.getPlans();
    storageUtils.savePlans(plans.filter(p => p.id !== id));
  },

  getMemberships: (): Membership[] => {
    return JSON.parse(localStorage.getItem('flextrack_memberships') || '[]');
  },

  saveMemberships: (memberships: Membership[]): void => {
    localStorage.setItem('flextrack_memberships', JSON.stringify(memberships));
  },

  addMembership: (membership: Membership): void => {
    const memberships = storageUtils.getMemberships();
    memberships.push(membership);
    storageUtils.saveMemberships(memberships);
  },

  updateMembership: (id: string, updates: Partial<Membership>): void => {
    const memberships = storageUtils.getMemberships();
    const index = memberships.findIndex(m => m.id === id);
    if (index !== -1) {
      memberships[index] = { ...memberships[index], ...updates };
      storageUtils.saveMemberships(memberships);
    }
  },

  getStats: (): DashboardStats => {
    const memberships = storageUtils.getMemberships();
    const members = storageUtils.getMembers();

    const now = new Date();
    const active = memberships.filter(m => m.status === 'active' && new Date(m.endDate) > now).length;
    const expired = memberships.filter(m => m.status === 'expired' || new Date(m.endDate) <= now).length;
    const paused = memberships.filter(m => m.status === 'paused').length;
    const extended = memberships.filter(m => m.status === 'extended').length;
    const revenue = memberships.reduce((sum, m) => sum + m.amountPaid, 0);

    return {
      totalMembers: members.length,
      activePlans: active,
      expiredPlans: expired,
      totalRevenue: revenue,
      pausedPlans: paused,
      extendedPlans: extended,
    };
  },
};
