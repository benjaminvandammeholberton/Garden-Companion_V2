"""
API router for handling Action-related operations.
"""

from app.services.action_service import ActionService
from fastapi import APIRouter, Depends
from uuid import UUID

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.action_schema import (
    ActionCreate, ActionUpdate)

# APIRouter instance for Action-related routes
action_router = APIRouter()


@action_router.get(
    '/',
    summary='Get all actions of the user',
)
async def list(area_id: UUID | None = None, current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve all actions of the current user.

    :param current_user: The authenticated user.
    :return: List of actions.
    """
    return await ActionService.list_actions(area_id, current_user)


@action_router.post(
    '/', summary="Create sowing action")
async def create_action(
    data: ActionCreate,
    current_user: User = Depends(get_current_user),
):
    """
    Endpoint to create a new action for the current userr
    """
    return await ActionService.create_action(current_user, data)


@action_router.get(
    '/{action_id}',
    summary='Get a action by action_id',
)
async def retrieve(
    action_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to retrieve a action by its ID.

    :param action_id: ID of the action to retrieve.
    :param current_user: The authenticated user.
    :return: The retrieved action.
    """
    return await ActionService.retrieve_action(current_user, action_id)


@action_router.put(
    '/{action_id}',
    summary="Update action by action_id"
)
async def update(
    action_id: UUID,
    data: ActionUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to update a action by its ID.

    :param action_id: ID of the action to update.
    :param data: Updated data for the action.
    :param current_user: The authenticated user.
    :return: The updated action.
    """
    return await ActionService.update_action(
        current_user, action_id, data)


@action_router.delete(
    '/{action_id}', summary="Delete action by action_id")
async def delete(
    action_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to delete a action by its ID.

    :param action_id: ID of the action to delete.
    :param current_user: The authenticated user.
    :return: None.
    """
    await ActionService.delete_action(current_user, action_id)
    return None
