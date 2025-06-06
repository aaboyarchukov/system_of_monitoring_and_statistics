// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v6.30.2
// source: protos/proto_organization_manager.proto

package organisation_manager_v1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	OrganisationManager_GetSportTypes_FullMethodName      = "/OrganisationManager/GetSportTypes"
	OrganisationManager_GetLeagues_FullMethodName         = "/OrganisationManager/GetLeagues"
	OrganisationManager_PostNewLeague_FullMethodName      = "/OrganisationManager/PostNewLeague"
	OrganisationManager_GetLeaguesTours_FullMethodName    = "/OrganisationManager/GetLeaguesTours"
	OrganisationManager_GetLeaguesTeams_FullMethodName    = "/OrganisationManager/GetLeaguesTeams"
	OrganisationManager_PostTourIntoLeague_FullMethodName = "/OrganisationManager/PostTourIntoLeague"
	OrganisationManager_PostTeamIntoLeague_FullMethodName = "/OrganisationManager/PostTeamIntoLeague"
	OrganisationManager_PostNewTeam_FullMethodName        = "/OrganisationManager/PostNewTeam"
	OrganisationManager_PostPlayerIntoTeam_FullMethodName = "/OrganisationManager/PostPlayerIntoTeam"
	OrganisationManager_PostNewPlayer_FullMethodName      = "/OrganisationManager/PostNewPlayer"
	OrganisationManager_GetRoundsOfTour_FullMethodName    = "/OrganisationManager/GetRoundsOfTour"
	OrganisationManager_GetMatchesOfRound_FullMethodName  = "/OrganisationManager/GetMatchesOfRound"
	OrganisationManager_GetAllPlayers_FullMethodName      = "/OrganisationManager/GetAllPlayers"
	OrganisationManager_GetPlayersOfTeam_FullMethodName   = "/OrganisationManager/GetPlayersOfTeam"
	OrganisationManager_PostNewGroupOfTour_FullMethodName = "/OrganisationManager/PostNewGroupOfTour"
	OrganisationManager_GetGroupsOfTour_FullMethodName    = "/OrganisationManager/GetGroupsOfTour"
	OrganisationManager_PostTeamIntoGroup_FullMethodName  = "/OrganisationManager/PostTeamIntoGroup"
)

// OrganisationManagerClient is the client API for OrganisationManager service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type OrganisationManagerClient interface {
	GetSportTypes(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*SportTypes, error)
	GetLeagues(ctx context.Context, in *GetLeaguesRequest, opts ...grpc.CallOption) (*Leagues, error)
	PostNewLeague(ctx context.Context, in *PostNewLeagueRequest, opts ...grpc.CallOption) (*League, error)
	GetLeaguesTours(ctx context.Context, in *GetLeaguesToursRequest, opts ...grpc.CallOption) (*Tours, error)
	GetLeaguesTeams(ctx context.Context, in *GetLeaguesTeamsRequest, opts ...grpc.CallOption) (*Teams, error)
	PostTourIntoLeague(ctx context.Context, in *PostTourRequest, opts ...grpc.CallOption) (*Tour, error)
	PostTeamIntoLeague(ctx context.Context, in *PostTeamRequest, opts ...grpc.CallOption) (*Team, error)
	PostNewTeam(ctx context.Context, in *PostNewTeamRequest, opts ...grpc.CallOption) (*Team, error)
	PostPlayerIntoTeam(ctx context.Context, in *PostPlayerRequest, opts ...grpc.CallOption) (*Player, error)
	PostNewPlayer(ctx context.Context, in *PostNewPlayerRequest, opts ...grpc.CallOption) (*Player, error)
	GetRoundsOfTour(ctx context.Context, in *GetRoundsRequest, opts ...grpc.CallOption) (*Rounds, error)
	GetMatchesOfRound(ctx context.Context, in *GetMatchesOfRoundRequest, opts ...grpc.CallOption) (*Matches, error)
	GetAllPlayers(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*Players, error)
	GetPlayersOfTeam(ctx context.Context, in *GetPlayersOfTeamRequest, opts ...grpc.CallOption) (*Players, error)
	PostNewGroupOfTour(ctx context.Context, in *PostNewGroup, opts ...grpc.CallOption) (*Group, error)
	GetGroupsOfTour(ctx context.Context, in *GetGroupsRequest, opts ...grpc.CallOption) (*Groups, error)
	PostTeamIntoGroup(ctx context.Context, in *PostTeamInGroupRequest, opts ...grpc.CallOption) (*Team, error)
}

type organisationManagerClient struct {
	cc grpc.ClientConnInterface
}

func NewOrganisationManagerClient(cc grpc.ClientConnInterface) OrganisationManagerClient {
	return &organisationManagerClient{cc}
}

func (c *organisationManagerClient) GetSportTypes(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*SportTypes, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(SportTypes)
	err := c.cc.Invoke(ctx, OrganisationManager_GetSportTypes_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetLeagues(ctx context.Context, in *GetLeaguesRequest, opts ...grpc.CallOption) (*Leagues, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Leagues)
	err := c.cc.Invoke(ctx, OrganisationManager_GetLeagues_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostNewLeague(ctx context.Context, in *PostNewLeagueRequest, opts ...grpc.CallOption) (*League, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(League)
	err := c.cc.Invoke(ctx, OrganisationManager_PostNewLeague_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetLeaguesTours(ctx context.Context, in *GetLeaguesToursRequest, opts ...grpc.CallOption) (*Tours, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Tours)
	err := c.cc.Invoke(ctx, OrganisationManager_GetLeaguesTours_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetLeaguesTeams(ctx context.Context, in *GetLeaguesTeamsRequest, opts ...grpc.CallOption) (*Teams, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Teams)
	err := c.cc.Invoke(ctx, OrganisationManager_GetLeaguesTeams_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostTourIntoLeague(ctx context.Context, in *PostTourRequest, opts ...grpc.CallOption) (*Tour, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Tour)
	err := c.cc.Invoke(ctx, OrganisationManager_PostTourIntoLeague_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostTeamIntoLeague(ctx context.Context, in *PostTeamRequest, opts ...grpc.CallOption) (*Team, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Team)
	err := c.cc.Invoke(ctx, OrganisationManager_PostTeamIntoLeague_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostNewTeam(ctx context.Context, in *PostNewTeamRequest, opts ...grpc.CallOption) (*Team, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Team)
	err := c.cc.Invoke(ctx, OrganisationManager_PostNewTeam_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostPlayerIntoTeam(ctx context.Context, in *PostPlayerRequest, opts ...grpc.CallOption) (*Player, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Player)
	err := c.cc.Invoke(ctx, OrganisationManager_PostPlayerIntoTeam_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostNewPlayer(ctx context.Context, in *PostNewPlayerRequest, opts ...grpc.CallOption) (*Player, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Player)
	err := c.cc.Invoke(ctx, OrganisationManager_PostNewPlayer_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetRoundsOfTour(ctx context.Context, in *GetRoundsRequest, opts ...grpc.CallOption) (*Rounds, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Rounds)
	err := c.cc.Invoke(ctx, OrganisationManager_GetRoundsOfTour_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetMatchesOfRound(ctx context.Context, in *GetMatchesOfRoundRequest, opts ...grpc.CallOption) (*Matches, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Matches)
	err := c.cc.Invoke(ctx, OrganisationManager_GetMatchesOfRound_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetAllPlayers(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*Players, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Players)
	err := c.cc.Invoke(ctx, OrganisationManager_GetAllPlayers_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetPlayersOfTeam(ctx context.Context, in *GetPlayersOfTeamRequest, opts ...grpc.CallOption) (*Players, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Players)
	err := c.cc.Invoke(ctx, OrganisationManager_GetPlayersOfTeam_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostNewGroupOfTour(ctx context.Context, in *PostNewGroup, opts ...grpc.CallOption) (*Group, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Group)
	err := c.cc.Invoke(ctx, OrganisationManager_PostNewGroupOfTour_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) GetGroupsOfTour(ctx context.Context, in *GetGroupsRequest, opts ...grpc.CallOption) (*Groups, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Groups)
	err := c.cc.Invoke(ctx, OrganisationManager_GetGroupsOfTour_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *organisationManagerClient) PostTeamIntoGroup(ctx context.Context, in *PostTeamInGroupRequest, opts ...grpc.CallOption) (*Team, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(Team)
	err := c.cc.Invoke(ctx, OrganisationManager_PostTeamIntoGroup_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// OrganisationManagerServer is the server API for OrganisationManager service.
// All implementations must embed UnimplementedOrganisationManagerServer
// for forward compatibility.
type OrganisationManagerServer interface {
	GetSportTypes(context.Context, *Empty) (*SportTypes, error)
	GetLeagues(context.Context, *GetLeaguesRequest) (*Leagues, error)
	PostNewLeague(context.Context, *PostNewLeagueRequest) (*League, error)
	GetLeaguesTours(context.Context, *GetLeaguesToursRequest) (*Tours, error)
	GetLeaguesTeams(context.Context, *GetLeaguesTeamsRequest) (*Teams, error)
	PostTourIntoLeague(context.Context, *PostTourRequest) (*Tour, error)
	PostTeamIntoLeague(context.Context, *PostTeamRequest) (*Team, error)
	PostNewTeam(context.Context, *PostNewTeamRequest) (*Team, error)
	PostPlayerIntoTeam(context.Context, *PostPlayerRequest) (*Player, error)
	PostNewPlayer(context.Context, *PostNewPlayerRequest) (*Player, error)
	GetRoundsOfTour(context.Context, *GetRoundsRequest) (*Rounds, error)
	GetMatchesOfRound(context.Context, *GetMatchesOfRoundRequest) (*Matches, error)
	GetAllPlayers(context.Context, *Empty) (*Players, error)
	GetPlayersOfTeam(context.Context, *GetPlayersOfTeamRequest) (*Players, error)
	PostNewGroupOfTour(context.Context, *PostNewGroup) (*Group, error)
	GetGroupsOfTour(context.Context, *GetGroupsRequest) (*Groups, error)
	PostTeamIntoGroup(context.Context, *PostTeamInGroupRequest) (*Team, error)
	mustEmbedUnimplementedOrganisationManagerServer()
}

// UnimplementedOrganisationManagerServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedOrganisationManagerServer struct{}

func (UnimplementedOrganisationManagerServer) GetSportTypes(context.Context, *Empty) (*SportTypes, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSportTypes not implemented")
}
func (UnimplementedOrganisationManagerServer) GetLeagues(context.Context, *GetLeaguesRequest) (*Leagues, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetLeagues not implemented")
}
func (UnimplementedOrganisationManagerServer) PostNewLeague(context.Context, *PostNewLeagueRequest) (*League, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostNewLeague not implemented")
}
func (UnimplementedOrganisationManagerServer) GetLeaguesTours(context.Context, *GetLeaguesToursRequest) (*Tours, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetLeaguesTours not implemented")
}
func (UnimplementedOrganisationManagerServer) GetLeaguesTeams(context.Context, *GetLeaguesTeamsRequest) (*Teams, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetLeaguesTeams not implemented")
}
func (UnimplementedOrganisationManagerServer) PostTourIntoLeague(context.Context, *PostTourRequest) (*Tour, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostTourIntoLeague not implemented")
}
func (UnimplementedOrganisationManagerServer) PostTeamIntoLeague(context.Context, *PostTeamRequest) (*Team, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostTeamIntoLeague not implemented")
}
func (UnimplementedOrganisationManagerServer) PostNewTeam(context.Context, *PostNewTeamRequest) (*Team, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostNewTeam not implemented")
}
func (UnimplementedOrganisationManagerServer) PostPlayerIntoTeam(context.Context, *PostPlayerRequest) (*Player, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostPlayerIntoTeam not implemented")
}
func (UnimplementedOrganisationManagerServer) PostNewPlayer(context.Context, *PostNewPlayerRequest) (*Player, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostNewPlayer not implemented")
}
func (UnimplementedOrganisationManagerServer) GetRoundsOfTour(context.Context, *GetRoundsRequest) (*Rounds, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetRoundsOfTour not implemented")
}
func (UnimplementedOrganisationManagerServer) GetMatchesOfRound(context.Context, *GetMatchesOfRoundRequest) (*Matches, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetMatchesOfRound not implemented")
}
func (UnimplementedOrganisationManagerServer) GetAllPlayers(context.Context, *Empty) (*Players, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAllPlayers not implemented")
}
func (UnimplementedOrganisationManagerServer) GetPlayersOfTeam(context.Context, *GetPlayersOfTeamRequest) (*Players, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPlayersOfTeam not implemented")
}
func (UnimplementedOrganisationManagerServer) PostNewGroupOfTour(context.Context, *PostNewGroup) (*Group, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostNewGroupOfTour not implemented")
}
func (UnimplementedOrganisationManagerServer) GetGroupsOfTour(context.Context, *GetGroupsRequest) (*Groups, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetGroupsOfTour not implemented")
}
func (UnimplementedOrganisationManagerServer) PostTeamIntoGroup(context.Context, *PostTeamInGroupRequest) (*Team, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostTeamIntoGroup not implemented")
}
func (UnimplementedOrganisationManagerServer) mustEmbedUnimplementedOrganisationManagerServer() {}
func (UnimplementedOrganisationManagerServer) testEmbeddedByValue()                             {}

// UnsafeOrganisationManagerServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to OrganisationManagerServer will
// result in compilation errors.
type UnsafeOrganisationManagerServer interface {
	mustEmbedUnimplementedOrganisationManagerServer()
}

func RegisterOrganisationManagerServer(s grpc.ServiceRegistrar, srv OrganisationManagerServer) {
	// If the following call pancis, it indicates UnimplementedOrganisationManagerServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&OrganisationManager_ServiceDesc, srv)
}

func _OrganisationManager_GetSportTypes_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetSportTypes(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetSportTypes_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetSportTypes(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetLeagues_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetLeaguesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetLeagues(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetLeagues_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetLeagues(ctx, req.(*GetLeaguesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostNewLeague_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostNewLeagueRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostNewLeague(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostNewLeague_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostNewLeague(ctx, req.(*PostNewLeagueRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetLeaguesTours_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetLeaguesToursRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetLeaguesTours(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetLeaguesTours_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetLeaguesTours(ctx, req.(*GetLeaguesToursRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetLeaguesTeams_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetLeaguesTeamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetLeaguesTeams(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetLeaguesTeams_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetLeaguesTeams(ctx, req.(*GetLeaguesTeamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostTourIntoLeague_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostTourRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostTourIntoLeague(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostTourIntoLeague_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostTourIntoLeague(ctx, req.(*PostTourRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostTeamIntoLeague_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostTeamRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostTeamIntoLeague(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostTeamIntoLeague_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostTeamIntoLeague(ctx, req.(*PostTeamRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostNewTeam_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostNewTeamRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostNewTeam(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostNewTeam_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostNewTeam(ctx, req.(*PostNewTeamRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostPlayerIntoTeam_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostPlayerRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostPlayerIntoTeam(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostPlayerIntoTeam_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostPlayerIntoTeam(ctx, req.(*PostPlayerRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostNewPlayer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostNewPlayerRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostNewPlayer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostNewPlayer_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostNewPlayer(ctx, req.(*PostNewPlayerRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetRoundsOfTour_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetRoundsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetRoundsOfTour(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetRoundsOfTour_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetRoundsOfTour(ctx, req.(*GetRoundsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetMatchesOfRound_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetMatchesOfRoundRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetMatchesOfRound(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetMatchesOfRound_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetMatchesOfRound(ctx, req.(*GetMatchesOfRoundRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetAllPlayers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetAllPlayers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetAllPlayers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetAllPlayers(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetPlayersOfTeam_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetPlayersOfTeamRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetPlayersOfTeam(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetPlayersOfTeam_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetPlayersOfTeam(ctx, req.(*GetPlayersOfTeamRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostNewGroupOfTour_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostNewGroup)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostNewGroupOfTour(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostNewGroupOfTour_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostNewGroupOfTour(ctx, req.(*PostNewGroup))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_GetGroupsOfTour_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetGroupsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).GetGroupsOfTour(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_GetGroupsOfTour_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).GetGroupsOfTour(ctx, req.(*GetGroupsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OrganisationManager_PostTeamIntoGroup_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostTeamInGroupRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OrganisationManagerServer).PostTeamIntoGroup(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OrganisationManager_PostTeamIntoGroup_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OrganisationManagerServer).PostTeamIntoGroup(ctx, req.(*PostTeamInGroupRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// OrganisationManager_ServiceDesc is the grpc.ServiceDesc for OrganisationManager service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var OrganisationManager_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "OrganisationManager",
	HandlerType: (*OrganisationManagerServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetSportTypes",
			Handler:    _OrganisationManager_GetSportTypes_Handler,
		},
		{
			MethodName: "GetLeagues",
			Handler:    _OrganisationManager_GetLeagues_Handler,
		},
		{
			MethodName: "PostNewLeague",
			Handler:    _OrganisationManager_PostNewLeague_Handler,
		},
		{
			MethodName: "GetLeaguesTours",
			Handler:    _OrganisationManager_GetLeaguesTours_Handler,
		},
		{
			MethodName: "GetLeaguesTeams",
			Handler:    _OrganisationManager_GetLeaguesTeams_Handler,
		},
		{
			MethodName: "PostTourIntoLeague",
			Handler:    _OrganisationManager_PostTourIntoLeague_Handler,
		},
		{
			MethodName: "PostTeamIntoLeague",
			Handler:    _OrganisationManager_PostTeamIntoLeague_Handler,
		},
		{
			MethodName: "PostNewTeam",
			Handler:    _OrganisationManager_PostNewTeam_Handler,
		},
		{
			MethodName: "PostPlayerIntoTeam",
			Handler:    _OrganisationManager_PostPlayerIntoTeam_Handler,
		},
		{
			MethodName: "PostNewPlayer",
			Handler:    _OrganisationManager_PostNewPlayer_Handler,
		},
		{
			MethodName: "GetRoundsOfTour",
			Handler:    _OrganisationManager_GetRoundsOfTour_Handler,
		},
		{
			MethodName: "GetMatchesOfRound",
			Handler:    _OrganisationManager_GetMatchesOfRound_Handler,
		},
		{
			MethodName: "GetAllPlayers",
			Handler:    _OrganisationManager_GetAllPlayers_Handler,
		},
		{
			MethodName: "GetPlayersOfTeam",
			Handler:    _OrganisationManager_GetPlayersOfTeam_Handler,
		},
		{
			MethodName: "PostNewGroupOfTour",
			Handler:    _OrganisationManager_PostNewGroupOfTour_Handler,
		},
		{
			MethodName: "GetGroupsOfTour",
			Handler:    _OrganisationManager_GetGroupsOfTour_Handler,
		},
		{
			MethodName: "PostTeamIntoGroup",
			Handler:    _OrganisationManager_PostTeamIntoGroup_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protos/proto_organization_manager.proto",
}
