//! Auth
export const admin_login = 'api/admin/admin_login';
export const get_admin_detail = 'api/admin/getAdmin';

//! Dashboard
export const get_dashboard = 'api/admin/get_dashboard';

//! Contest
export const get_contest = 'api/admin/get_all_contest';
export const create_contest = 'api/admin/create_contest';
export const update_contest = 'api/admin/edit_contest';
export const delete_contest = 'api/admin/delete_contest';

//! Points
export const get_points = 'api/admin/get_points';

//! Users
export const get_users = 'api/admin/get_all_users';

//! Player
export const get_player = 'api/admin/getAllPlayer';
export const create_player = 'api/admin/addPlayer';
export const update_player = '';
export const delete_player = '';
export const update_player_wallet = 'api/admin/addOrDeductAmount';
export const change_player_status = 'api/admin/changePlayerStatus';

//! Game History
export const get_ftt_game_history = 'api/adminGetGameHistory';
export const get_fst_game_history = 'api/sorat/adminGetGameHistory';
export const get_pt_game_history = 'api/prologic/adminGetGameHistory';

//! Current Game
//* Fun Target Timer
export const get_current_ftt_game_id = 'api/currentGame';
export const get_current_ftt_game_total_bets = 'api/totalBets';
export const get_current_ftt_game_timer = 'api/gameTimer';
export const current_ftt_game_winner_by_admin = 'api/winnerByAdmin';

//* Fun Sorat Timer
export const get_current_fst_game_id = 'api/sorat/currentGame';
export const get_current_fst_game_total_bets = 'api/sorat/totalBets';
export const get_current_fst_game_timer = 'api/sorat/gameTimer';
export const current_fst_game_winner_by_admin = 'api/sorat/winnerByAdmin';

//* Prologic Timer
export const get_current_pt_game_id = 'api/prologic/currentGame';
export const get_current_pt_game_total_bets = 'api/prologic/totalBets';
export const get_current_pt_game_timer = 'api/prologic/new/game';
export const current_pt_game_winner_by_admin = 'api/prologic/winnerByAdmin';

//* Payment
export const get_payment_request = 'api/admin/get_withdrawl_request';
export const get_payment_history = 'api/admin/get_withdrawl_history';
export const approve_reject_payment_request = 'api/admin/handle_withdrawl_request';

//! Setting
//* Sub admin 
export const get_sub_admin = 'api/admin/getSubadmin';
export const create_sub_admin = 'api/admin/addSubadmin';
export const update_sub_admin = (id) => `api/admin/updateSubadmin/${id}`;
export const delete_sub_admin = (id) => `api/admin/deleteSubadmin/${id}`;

//* Admin
export const change_admin_password = 'api/admin/changePassword';

//* Settings
export const set_Profit = 'api/admin/setProfit';