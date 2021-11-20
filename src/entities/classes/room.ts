import { Position } from './position';

export class Room {
  constructor(
    public id: number,
    public grabbed: string[] = [],
    public cursors: Map<string, Position> = new Map(),
    public createdAt: number = new Date().getTime(),
  ) {}

  public get participants() {
    return this.cursors.keys();
  }

  /**
   * Add user to participant list
   *
   * @param userId
   * @returns participants count
   */
  public join(userId: string): number {
    this.cursors.set(userId, new Position());
    return this.cursors.size;
  }

  /**
   * Remove user to participant list
   *
   * @param userId
   * @returns participants count
   */
  public leave(userId: string): number {
    this.cursors.delete(userId);
    return this.cursors.size;
  }
}
