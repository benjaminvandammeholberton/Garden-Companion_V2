"""
API router for handling Seedling-related operations.
"""

from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.seedling_schema import (
    SeedlingOut, SeedlingCreate, SeedlingUpdate)
from app.services.seedling_service import SeedlingService
# APIRouter instance for Seedling-related routes
seedling_router = APIRouter()


@seedling_router.get(
    '/',
    summary='Get all seedlings of the user',
    response_model=List[SeedlingOut]
)
async def list(current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve all seedlings of the current user.

    :param current_user: The authenticated user.
    :return: List of seedlings.
    """
    return await SeedlingService.list_seedlings(current_user)


@seedling_router.post(
    '/create', summary="Create Seedling", response_model=SeedlingOut)
async def create_seedling(
    data: SeedlingCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to create a new seedling for the current user.

    :param data: Data for creating a new seedling.
    :param current_user: The authenticated user.
    :return: Created seedling.
    """
    return await SeedlingService.create_seedling(current_user, data)


@seedling_router.get(
    '/{seedling_id}',
    summary='Get a seedling by seedling_id',
    response_model=SeedlingOut
)
async def retrieve(
    seedling_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to retrieve a seedling by its ID.

    :param seedling_id: ID of the seedling to retrieve.
    :param current_user: The authenticated user.
    :return: The retrieved seedling.
    """
    return await SeedlingService.retrieve_seedling(current_user, seedling_id)


@seedling_router.put(
    '/{seedling_id}',
    summary="Update seedling by seedling_id",
    response_model=SeedlingOut
)
async def update(
    seedling_id: UUID,
    data: SeedlingUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to update a seedling by its ID.

    :param seedling_id: ID of the seedling to update.
    :param data: Updated data for the seedling.
    :param current_user: The authenticated user.
    :return: The updated seedling.
    """
    return await SeedlingService.update_seedling(
        current_user, seedling_id, data)


@seedling_router.delete(
    '/{seedling_id}', summary="Delete seedling by seedling_id")
async def delete(
    seedling_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to delete a seedling by its ID.

    :param seedling_id: ID of the seedling to delete.
    :param current_user: The authenticated user.
    :return: None.
    """
    await SeedlingService.delete_seedling(current_user, seedling_id)
    return None
