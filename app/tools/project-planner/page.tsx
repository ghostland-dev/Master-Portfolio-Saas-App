"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DateRangePicker } from "./date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { addDays, format, differenceInDays, isBefore, isAfter } from "date-fns"
import { fr } from "date-fns/locale"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

// Ajouter l'import du type DateRange en haut du fichier
import type { DateRange } from "react-day-picker"

// Types for our project data
// Définir l'interface Task
type Task = {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  progress: number
  priority: "low" | "medium" | "high"
  assignee: string
  dependencies: string[]
  completed: boolean
}

// Définir l'interface Phase
interface Phase {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  tasks: Task[]
  status: "not-started" | "in-progress" | "completed" | "delayed"
  collapsed?: boolean
}

type Project = {
  title: string
  description: string
  startDate: Date
  endDate: Date
  tasks: Task[]
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9)

// Status colors
const statusColors = {
  "not-started": "bg-slate-200 dark:bg-slate-700",
  "in-progress": "bg-blue-200 dark:bg-blue-700",
  completed: "bg-green-200 dark:bg-green-700",
  delayed: "bg-red-200 dark:bg-red-700",
}

// Priority colors
const priorityColors = {
  low: "bg-slate-100 dark:bg-slate-800",
  medium: "bg-yellow-100 dark:bg-yellow-800/50",
  high: "bg-orange-100 dark:bg-orange-800/50",
}

// Sortable Task Item Component
function SortableTaskItem({
  task,
  onEdit,
  onDelete,
  allTasks,
}: {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  allTasks: Task[]
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getDependencyTitle = (id: string) => {
    const dependency = allTasks.find((t) => t.id === id)
    return dependency ? dependency.title : "Tâche inconnue"
  }

  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500"
    if (progress < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return "Non définie"
    }
  }

  const duration = differenceInDays(task.endDate, task.startDate) + 1

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="mb-3">
      <Card
        className={`border-l-4 ${task.completed ? "border-l-green-500 opacity-70" : `border-l-${task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "green"}-500`} dark:bg-slate-800`}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <button {...listeners} className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted">
                  <Icon name="GripVertical" className="h-4 w-4 text-muted-foreground" />
                </button>
                <CardTitle className={`text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </CardTitle>
              </div>
              <CardDescription className="mt-1">
                {format(task.startDate, "dd/MM/yyyy")} - {format(task.endDate, "dd/MM/yyyy")} ({duration} jour
                {duration > 1 ? "s" : ""})
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                      <Icon name="Pencil" className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modifier</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                      <Icon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Supprimer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                <span>Priorité: {getPriorityLabel(task.priority)}</span>
              </div>
              <div>
                <Badge variant={task.completed ? "outline" : "default"}>
                  {task.completed ? "Terminée" : `${task.progress}%`}
                </Badge>
              </div>
            </div>

            {!task.completed && (
              <div className="w-full h-1.5 bg-muted dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(task.progress)}`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            )}

            {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}

            {task.assignee && (
              <div className="flex items-center gap-2 text-sm">
                <Icon name="User" className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{task.assignee}</span>
              </div>
            )}

            {task.dependencies.length > 0 && (
              <div className="text-sm">
                <span className="text-muted-foreground">Dépendances: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {task.dependencies.map((depId) => (
                    <Badge key={depId} variant="outline" className="text-xs">
                      {getDependencyTitle(depId)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProjectPlannerPage() {
  // Default project data
  const defaultProject: Project = {
    title: "Nouveau Projet",
    description: "Description du projet",
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    tasks: [],
  }

  // State for the project
  const [project, setProject] = useState<Project>({
    title: "Nouveau Projet",
    description: "Description du projet",
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    tasks: [],
  })

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    progress: 0,
    priority: "medium",
    assignee: "",
    dependencies: [],
    completed: false,
  })

  // Load project from localStorage on component mount
  useEffect(() => {
    const savedProject = localStorage.getItem("project")
    if (savedProject) {
      try {
        const parsedProject = JSON.parse(savedProject)
        // Convert string dates back to Date objects
        parsedProject.startDate = new Date(parsedProject.startDate)
        parsedProject.endDate = new Date(parsedProject.endDate)
        parsedProject.tasks = parsedProject.tasks.map((task: any) => ({
          ...task,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
        }))
        setProject(parsedProject)
      } catch (error) {
        console.error("Error parsing saved project:", error)
      }
    }
  }, [])

  // Save project to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(project))
  }, [project])

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Handle DnD end
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setProject((prev) => {
        const oldIndex = prev.tasks.findIndex((task) => task.id === active.id)
        const newIndex = prev.tasks.findIndex((task) => task.id === over.id)

        return {
          ...prev,
          tasks: arrayMove(prev.tasks, oldIndex, newIndex),
        }
      })
    }
  }

  // Add or update task
  const handleSaveTask = () => {
    if (!newTask.title) return

    if (editingTask) {
      // Update existing task
      setProject((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task.id === editingTask.id ? { ...newTask, id: task.id } : task)),
      }))
      setEditingTask(null)
    } else {
      // Add new task
      const taskId = `task-${Date.now()}`
      setProject((prev) => ({
        ...prev,
        tasks: [...prev.tasks, { ...newTask, id: taskId }],
      }))
    }

    // Reset form
    setNewTask({
      id: "",
      title: "",
      description: "",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      progress: 0,
      priority: "medium",
      assignee: "",
      dependencies: [],
      completed: false,
    })
    setIsAddingTask(false)
  }

  // Edit task
  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setNewTask({ ...task })
    setIsAddingTask(true)
  }

  // Delete task
  const handleDeleteTask = (id: string) => {
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
      // Also remove this task from dependencies
      tasks: prev.tasks
        .filter((task) => task.id !== id)
        .map((task) => ({
          ...task,
          dependencies: task.dependencies.filter((depId) => depId !== id),
        })),
    }))
  }

  // Toggle task completion
  const handleToggleTaskCompletion = (id: string) => {
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  // Update project dates
  const handleProjectDatesChange = (range: { from: Date; to: Date }) => {
    setProject((prev) => ({
      ...prev,
      startDate: range.from,
      endDate: range.to,
    }))
  }

  // Calculate project progress
  const calculateProjectProgress = () => {
    if (project.tasks.length === 0) return 0

    const totalTasks = project.tasks.length
    const completedTasks = project.tasks.filter((task) => task.completed).length
    const inProgressTasksProgress = project.tasks
      .filter((task) => !task.completed)
      .reduce((sum, task) => sum + task.progress, 0)

    return Math.round((completedTasks * 100 + inProgressTasksProgress) / totalTasks)
  }

  // Calculate project duration in days
  const projectDuration = differenceInDays(project.endDate, project.startDate) + 1

  // Filter tasks by status
  const allTasks = project.tasks
  const completedTasks = project.tasks.filter((task) => task.completed)
  const pendingTasks = project.tasks.filter((task) => !task.completed)

  // Mettre à jour les types des useState
  const [phases, setPhases] = useState<Phase[]>([])
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null)
  const [isAddingPhase, setIsAddingPhase] = useState(false)
  const [isEditingPhase, setIsEditingPhase] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), 0),
    to: addDays(new Date(), 30),
  })
  const [showDependencyWarning, setShowDependencyWarning] = useState(false)
  const [currentView, setCurrentView] = useState<"gantt" | "list" | "calendar">("gantt")

  // Calculate project duration in days
  // const projectDuration = differenceInDays(project.endDate, project.startDate) + 1

  // Update project dates when date range changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setProject((prev) => ({
        ...prev,
        startDate: dateRange.from,
        endDate: dateRange.to,
      }))
    }
  }, [dateRange])

  // Function to add a new phase
  const addPhase = () => {
    const newPhase: Phase = {
      id: generateId(),
      name: "Nouvelle Phase",
      description: "Description de la phase",
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      tasks: [],
      status: "not-started",
    }
    setProject((prev) => ({
      ...prev,
      phases: [...prev.phases, newPhase],
    }))
    // setActivePhase(newPhase.id)
  }

  // Function to update a phase
  const updatePhase = (phaseId: string, updates: Partial<Phase>) => {
    setProject((prev) => ({
      ...prev,
      // phases: prev.phases.map((phase) => (phase.id === phaseId ? { ...phase, ...updates } : phase)),
    }))
  }

  // Function to delete a phase
  const deletePhase = (phaseId: string) => {
    setProject((prev) => ({
      ...prev,
      // phases: prev.phases.filter((phase) => phase.id !== phaseId),
    }))
    // if (activePhase === phaseId) {
    //   setActivePhase(null)
    // }
  }

  // Function to add a new task to a phase
  const addTask = (phaseId: string) => {
    const newTask: Task = {
      id: generateId(),
      title: "Nouvelle Tâche",
      description: "Description de la tâche",
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      progress: 0,
      priority: "medium",
      assignee: "",
      dependencies: [],
      completed: false,
    }
    setProject((prev) => ({
      ...prev,
      // phases: prev.phases.map((phase) =>
      //   phase.id === phaseId ? { ...phase, tasks: [...phase.tasks, newTask] } : phase,
      // ),
    }))
    // setActiveTask(newTask.id)
  }

  // Function to update a task
  const updateTask = (phaseId: string, taskId: string, updates: Partial<Task>) => {
    // Check for circular dependencies
    // if (updates.dependencies) {
    //   const allTasks = project.phases.flatMap((phase) => phase.tasks)
    //   const taskToUpdate = allTasks.find((task) => task.id === taskId)

    //   if (taskToUpdate) {
    //     const wouldCreateCircular = (taskId: string, dependencies: string[], visited = new Set<string>()): boolean => {
    //       if (visited.has(taskId)) return true
    //       visited.add(taskId)

    //       for (const depId of dependencies) {
    //         const depTask = allTasks.find((t) => t.id === depId)
    //         if (depTask && wouldCreateCircular(depId, depTask.dependencies, new Set(visited))) {
    //           return true
    //         }
    //       }

    //       return false
    //     }

    //     if (wouldCreateCircular(taskId, updates.dependencies)) {
    //       setShowDependencyWarning(true)
    //       return
    //     }
    //   }
    // }

    // // Check for date constraints with dependencies
    // if (updates.startDate || updates.endDate) {
    //   const allTasks = project.phases.flatMap((phase) => phase.tasks)
    //   const taskToUpdate = allTasks.find((task) => task.id === taskId)

    //   if (taskToUpdate) {
    //     // Check that task doesn't start before its dependencies end
    //     for (const depId of taskToUpdate.dependencies) {
    //       const depTask = allTasks.find((t) => t.id === depId)
    //       if (depTask && updates.startDate && isBefore(updates.startDate, depTask.endDate)) {
    //         setShowDependencyWarning(true)
    //         return
    //       }
    //     }

    //     // Check that dependent tasks don't end before this task starts
    //     const dependentTasks = allTasks.filter((t) => t.dependencies.includes(taskId))
    //     for (const depTask of dependentTasks) {
    //       if (updates.endDate && isAfter(updates.endDate, depTask.startDate)) {
    //         setShowDependencyWarning(true)
    //         return
    //       }
    //     }
    //   }
    // }

    setProject((prev) => ({
      ...prev,
      // phases: prev.phases.map((phase) =>
      //   phase.id === phaseId
      //     ? {
      //         ...phase,
      //         tasks: phase.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
      //       }
      //     : phase,
      // ),
    }))
  }

  // Function to delete a task
  const deleteTask = (phaseId: string, taskId: string) => {
    // Check if any tasks depend on this one
    // const hasDependents = project.phases.some((phase) => phase.tasks.some((task) => task.dependencies.includes(taskId)))

    // if (hasDependents) {
    //   setShowDependencyWarning(true)
    //   return
    // }

    setProject((prev) => ({
      ...prev,
      // phases: prev.phases.map((phase) =>
      //   phase.id === phaseId
      //     ? {
      //         ...phase,
      //         tasks: phase.tasks.filter((task) => task.id !== taskId),
      //       }
      //     : phase,
      // ),
    }))

    // if (activeTask === taskId) {
    //   setActiveTask(null)
    // }
  }

  // Function to toggle phase collapse
  const togglePhaseCollapse = (phaseId: string) => {
    setProject((prev) => ({
      ...prev,
      // phases: prev.phases.map((phase) => (phase.id === phaseId ? { ...phase, collapsed: !phase.collapsed } : phase)),
    }))
  }

  // Function to get all tasks for dependency selection
  const getAllTasksExcept = (currentTaskId: string) => {
    return project.tasks
    // return project.phases.flatMap((phase) => phase.tasks.filter((task) => task.id !== currentTaskId))
  }

  // Function to export project as JSON
  const exportProject = () => {
    // const dataStr = JSON.stringify(project, null, 2)
    // const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    // const exportFileDefaultName = `${project.name.replace(/\s+/g, "_")}_plan.json`
    // const linkElement = document.createElement("a")
    // linkElement.setAttribute("href", dataUri)
    // linkElement.setAttribute("download", exportFileDefaultName)
    // linkElement.click()
  }

  // Function to find a task by ID
  const findTask = (taskId: string): [Task | null, Phase | null] => {
    // for (const phase of project.phases) {
    //   const task = phase.tasks.find((t) => t.id === taskId)
    //   if (task) {
    //     return [task, phase]
    //   }
    // }
    return [null, null]
  }

  // Calculate task position and width for Gantt chart
  const getTaskStyle = (task: Task) => {
    // const taskStart = differenceInDays(task.startDate, project.startDate)
    // const taskDuration = differenceInDays(task.endDate, task.startDate) + 1

    // const left = (taskStart / projectDuration) * 100
    // const width = (taskDuration / projectDuration) * 100

    return {
      // left: `${left}%`,
      // width: `${width}%`,
    }
  }

  // Generate date headers for Gantt chart
  const generateDateHeaders = () => {
    const dates = []
    let currentDate = new Date(project.startDate)

    while (currentDate <= project.endDate) {
      dates.push(new Date(currentDate))
      currentDate = addDays(currentDate, 1)
    }

    return dates
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker
            date={{
              from: project.startDate,
              to: project.endDate,
            }}
            onDateChange={handleProjectDatesChange}
          />

          <Button onClick={() => setIsAddingTask(true)}>
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Ajouter une tâche
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Progression du projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{calculateProjectProgress()}%</div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary" style={{ width: `${calculateProjectProgress()}%` }}></div>
            </div>
            <div className="text-sm text-muted-foreground">
              {completedTasks.length} sur {project.tasks.length} tâches terminées
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Durée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{projectDuration} jours</div>
            <div className="text-sm text-muted-foreground">
              Du {format(project.startDate, "dd MMMM yyyy", { locale: fr })} au{" "}
              {format(project.endDate, "dd MMMM yyyy", { locale: fr })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tâches par priorité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm">Haute</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-sm">Moyenne</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm">Basse</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm">{project.tasks.filter((t) => t.priority === "high").length}</div>
                <div className="text-sm">{project.tasks.filter((t) => t.priority === "medium").length}</div>
                <div className="text-sm">{project.tasks.filter((t) => t.priority === "low").length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">
            Toutes{" "}
            <Badge variant="outline" className="ml-2">
              {allTasks.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            En cours{" "}
            <Badge variant="outline" className="ml-2">
              {pendingTasks.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Terminées{" "}
            <Badge variant="outline" className="ml-2">
              {completedTasks.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les tâches</CardTitle>
              <CardDescription>Liste de toutes les tâches du projet</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={allTasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                    {allTasks.length > 0 ? (
                      allTasks.map((task) => (
                        <SortableTaskItem
                          key={task.id}
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          allTasks={allTasks}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Aucune tâche. Cliquez sur "Ajouter une tâche" pour commencer.
                      </div>
                    )}
                  </SortableContext>
                </DndContext>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tâches en cours</CardTitle>
              <CardDescription>Tâches non terminées</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {pendingTasks.length > 0 ? (
                  pendingTasks.map((task) => (
                    <SortableTaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      allTasks={allTasks}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Aucune tâche en cours.</div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tâches terminées</CardTitle>
              <CardDescription>Tâches marquées comme terminées</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <SortableTaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      allTasks={allTasks}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Aucune tâche terminée.</div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Gantt Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagramme de Gantt</CardTitle>
          <CardDescription>Visualisation temporelle des tâches</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="flex mb-2">
              <div className="w-1/4 font-medium">Tâche</div>
              <div className="w-3/4 flex">
                {Array.from({ length: projectDuration }).map((_, i) => {
                  const date = addDays(project.startDate, i)
                  return (
                    <div key={i} className="flex-1 text-center text-xs">
                      {format(date, "dd")}
                    </div>
                  )
                })}
              </div>
            </div>

            {project.tasks.map((task) => {
              const taskStart = Math.max(0, differenceInDays(task.startDate, project.startDate))
              const taskDuration = differenceInDays(task.endDate, task.startDate) + 1
              const taskWidth = (taskDuration / projectDuration) * 100
              const taskOffset = (taskStart / projectDuration) * 100

              return (
                <div key={task.id} className="flex items-center mb-2 h-8">
                  <div className="w-1/4 truncate pr-4">{task.title}</div>
                  <div className="w-3/4 relative">
                    <div
                      className={`absolute h-6 rounded-md ${task.completed ? "bg-green-500/20 border border-green-500 dark:bg-green-900/30 dark:border-green-700" : task.priority === "high" ? "bg-red-500/20 border border-red-500 dark:bg-red-900/30 dark:border-red-700" : task.priority === "medium" ? "bg-yellow-500/20 border border-yellow-500 dark:bg-yellow-900/30 dark:border-yellow-700" : "bg-green-500/20 border border-green-500 dark:bg-green-900/30 dark:border-green-700"}`}
                      style={{
                        left: `${taskOffset}%`,
                        width: `${taskWidth}%`,
                      }}
                    >
                      <div className="h-full flex items-center justify-center text-xs">{taskDuration}j</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Task Dialog */}
      {isAddingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>{editingTask ? "Modifier la tâche" : "Ajouter une tâche"}</CardTitle>
              <CardDescription>
                {editingTask ? "Modifiez les détails de la tâche" : "Remplissez les détails de la nouvelle tâche"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre de la tâche"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la tâche"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Input
                    type="date"
                    value={format(newTask.startDate, "yyyy-MM-dd")}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : new Date()
                      setNewTask((prev) => ({
                        ...prev,
                        startDate: date,
                        // Ensure end date is not before start date
                        endDate: isBefore(prev.endDate, date) ? date : prev.endDate,
                      }))
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <Input
                    type="date"
                    value={format(newTask.endDate, "yyyy-MM-dd")}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : new Date()
                      setNewTask((prev) => ({
                        ...prev,
                        endDate: date,
                        // Ensure start date is not after end date
                        startDate: isAfter(prev.startDate, date) ? date : prev.startDate,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setNewTask((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">Assigné à</Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, assignee: e.target.value }))}
                  placeholder="Nom de la personne assignée"
                />
              </div>

              <div className="space-y-2">
                <Label>Progression ({newTask.progress}%)</Label>
                <Slider
                  value={[newTask.progress]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setNewTask((prev) => ({ ...prev, progress: value[0] }))}
                />
              </div>

              {project.tasks.length > 0 && (
                <div className="space-y-2">
                  <Label>Dépendances</Label>
                  <ScrollArea className="h-32 border rounded-md p-2">
                    {project.tasks
                      .filter((task) => task.id !== editingTask?.id) // Don't show current task as dependency
                      .map((task) => (
                        <div key={task.id} className="flex items-center space-x-2 py-1">
                          <input
                            type="checkbox"
                            id={`dep-${task.id}`}
                            checked={newTask.dependencies.includes(task.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewTask((prev) => ({
                                  ...prev,
                                  dependencies: [...prev.dependencies, task.id],
                                }))
                              } else {
                                setNewTask((prev) => ({
                                  ...prev,
                                  dependencies: prev.dependencies.filter((id) => id !== task.id),
                                }))
                              }
                            }}
                            className="rounded text-primary focus:ring-primary"
                          />
                          <Label htmlFor={`dep-${task.id}`} className="cursor-pointer">
                            {task.title}
                          </Label>
                        </div>
                      ))}
                  </ScrollArea>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="completed"
                  checked={newTask.completed}
                  onCheckedChange={(checked) => setNewTask((prev) => ({ ...prev, completed: checked }))}
                />
                <Label htmlFor="completed">Tâche terminée</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingTask(false)
                  setEditingTask(null)
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleSaveTask}>{editingTask ? "Mettre à jour" : "Ajouter"}</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

